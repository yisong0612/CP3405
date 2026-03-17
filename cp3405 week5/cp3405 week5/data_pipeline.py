import sqlite3
import pandas as pd
import json


# --------------------------
# 函数1：从数据库读取清洗后的数据（传给LLM）
# --------------------------
def get_cleaned_data(stock_code):
    conn = sqlite3.connect('stock_pred.db')
    # 读取指定股票的所有清洗数据
    df = pd.read_sql(f"""
        SELECT * FROM cleaned_stock_data 
        WHERE stock_code = '{stock_code}'
        ORDER BY trade_date;
    """, conn)
    conn.close()
    # 转为LLM需要的结构化JSON格式
    llm_input = df.to_dict(orient="records")
    llm_input_json = json.dumps(llm_input, ensure_ascii=False)
    print(f"✅ 读取{stock_code}数据完成，共{len(df)}条")
    return llm_input_json


# --------------------------
# 函数2：存储LLM输出结果到数据库
# --------------------------
def save_llm_result(stock_code, llm_input_json, llm_output_json):
    # 解析LLM输出（确保包含必填字段）
    try:
        output_data = json.loads(llm_output_json)
        prediction = output_data["prediction"]
        confidence = output_data["confidence"]
        horizon = output_data["horizon"]
    except Exception as e:
        print(f"❌ LLM输出格式错误：{e}，必须包含prediction/confidence/horizon")
        return

    # 写入数据库
    conn = sqlite3.connect('stock_pred.db')
    cursor = conn.cursor()
    # 写入预测结果表
    cursor.execute('''
                   INSERT INTO prediction_results
                       (stock_code, prediction, confidence, horizon, model_type)
                   VALUES (?, ?, ?, ?, ?);
                   ''', (stock_code, prediction, confidence, horizon, "LLM"))
    # 写入LLM日志表（用于一致性检查）
    cursor.execute('''
                   INSERT INTO llm_logs
                       (stock_code, input_data, output_json)
                   VALUES (?, ?, ?);
                   ''', (stock_code, llm_input_json, llm_output_json))
    conn.commit()
    conn.close()
    print("✅ LLM结果已存入数据库！")


# --------------------------
# 函数3：读取演示数据（现场演示用）
# --------------------------
def get_demo_data(stock_code):
    # 读取本地清洗后的演示CSV（避免数据库故障）
    df = pd.read_csv("cleaned_demo_data.csv")
    demo_df = df[df["stock_code"] == stock_code].tail(10)  # 取最新10条
    demo_json = demo_df.to_dict(orient="records")
    # 🔧 增加空值判断，避免索引报错
    if not demo_json:
        print(f"⚠️  未找到{stock_code}的演示数据，自动取演示数据中第一条")
        demo_json = df.tail(10).to_dict(orient="records")
    print(f"✅ 演示数据准备完成：{stock_code}（共{len(demo_json)}条）")
    return demo_json


# --------------------------
# 测试完整链路（模拟LLM调用）
# --------------------------
if __name__ == "__main__":
    # 1. 读取茅台600519的清洗数据（传给LLM）
    llm_input = get_cleaned_data("600519")

    # 2. 模拟LLM输出（实际由LLM模块提供，格式必须匹配）
    llm_output = '''{
        "prediction": 1850.50,
        "confidence": 0.85,
        "horizon": "1d"
    }'''

    # 3. 存储LLM结果到数据库
    save_llm_result("600519", llm_input, llm_output)

    # 4. 准备演示数据（紫金矿业601899）
    demo_data = get_demo_data("601899")
    # 🔧 优化打印逻辑，避免索引报错
    print(f"📊 演示数据示例：{demo_data[0] if demo_data else '无演示数据（已自动处理）'}")
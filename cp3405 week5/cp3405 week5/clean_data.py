import pandas as pd
import sqlite3


# --------------------------
# 函数：数据清洗（去重、格式标准化）
# --------------------------
def clean_stock_data(df):
    # 1. 去重：删除「股票代码+日期」重复的数据（核心修复唯一约束报错）
    df = df.drop_duplicates(subset=["stock_code", "trade_date"], keep="last")
    # 2. 处理缺失值：删除收盘价、成交量为空的行
    df = df.dropna(subset=["close", "volume"])
    # 3. 格式标准化：确保字段类型正确
    df["close"] = df["close"].astype(float)  # 收盘价转为浮点型
    df["volume"] = df["volume"].astype(int)  # 成交量转为整型
    # 4. 日期格式统一（避免格式不一致导致的隐性重复）
    df["trade_date"] = pd.to_datetime(df["trade_date"]).dt.strftime("%Y-%m-%d")
    return df


# --------------------------
# 主逻辑：读取原始数据 → 清洗 → 写入数据库 + 保存清洗后CSV
# --------------------------
if __name__ == "__main__":
    # 1. 读取基准数据（茅台600519）并清洗
    benchmark_raw = pd.read_csv("benchmark_data.csv")
    benchmark_clean = clean_stock_data(benchmark_raw)
    # 保存清洗后的基准数据（团队共用）
    benchmark_clean.to_csv("cleaned_benchmark_data.csv", index=False, encoding="utf-8")
    print(f"✅ 基准数据清洗完成：cleaned_benchmark_data.csv（去重后共{len(benchmark_clean)}条）")

    # 2. 读取演示数据（紫金矿业601899）并清洗
    demo_raw = pd.read_csv("demo_data.csv")
    demo_clean = clean_stock_data(demo_raw)
    # 保存清洗后的演示数据（现场演示用）
    demo_clean.to_csv("cleaned_demo_data.csv", index=False, encoding="utf-8")
    print(f"✅ 演示数据清洗完成：cleaned_demo_data.csv（去重后共{len(demo_clean)}条）")

    # 3. 合并清洗后的数据，写入数据库（核心修复：添加if_exists='replace'，覆盖残留数据）
    combined_clean = pd.concat([benchmark_clean, demo_clean], ignore_index=True)
    conn = sqlite3.connect("stock_pred.db")

    # 写入数据库：if_exists='replace' 表示存在则替换，避免重复插入报错
    combined_clean.to_sql(
        name="cleaned_stock_data",  # 对应数据库中的表名
        con=conn,
        if_exists="replace",  # 核心修复：替换原有数据，解决唯一约束报错
        index=False
    )
    conn.close()
    print("✅ 清洗后的数据已写入数据库（cleaned_stock_data表），无重复数据")
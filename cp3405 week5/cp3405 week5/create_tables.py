import sqlite3

# 1. 连接SQLite数据库（不存在则自动创建，文件名为stock_pred.db）
conn = sqlite3.connect('stock_pred.db')
cursor = conn.cursor()

# 2. 创建表1：cleaned_stock_data（标准化清洗数据，LLM/ML唯一输入源）
# 只保留核心字段：股票代码、交易日期、收盘价、成交量（满足预测需求）
cursor.execute('''
CREATE TABLE IF NOT EXISTS cleaned_stock_data (
    stock_code TEXT NOT NULL,  -- 股票代码（如600519）
    trade_date TEXT NOT NULL,  -- 交易日期（格式：2025-01-01）
    close REAL NOT NULL,       -- 收盘价（核心预测字段）
    volume INTEGER,            -- 成交量
    PRIMARY KEY (stock_code, trade_date)  -- 联合主键，避免重复数据
);
''')

# 3. 创建表2：prediction_results（存储所有模型预测结果）
cursor.execute('''
CREATE TABLE IF NOT EXISTS prediction_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- 自增ID
    stock_code TEXT NOT NULL,              -- 股票代码
    prediction REAL NOT NULL,              -- 预测值（如收盘价）
    confidence REAL NOT NULL,              -- 置信度（0-1）
    horizon TEXT NOT NULL,                 -- 预测周期（如1d/3d）
    model_type TEXT NOT NULL               -- 模型类型（LLM/ML/MovingAvg）
);
''')

# 4. 创建表3：llm_logs（记录LLM推理日志，用于一致性检查）
cursor.execute('''
CREATE TABLE IF NOT EXISTS llm_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- 自增ID
    stock_code TEXT NOT NULL,              -- 股票代码
    input_data TEXT NOT NULL,              -- 输入LLM的结构化数据（JSON字符串）
    output_json TEXT NOT NULL              -- LLM输出的JSON结果
);
''')

# 5. 提交并关闭连接
conn.commit()
conn.close()

print("✅ 数据库创建成功！生成文件：stock_pred.db")
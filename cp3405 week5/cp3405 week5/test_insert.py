import sqlite3

# 连接数据库
conn = sqlite3.connect('stock_pred.db')
cursor = conn.cursor()

# 测试插入cleaned_stock_data表
test_data = [
    ('600519', '2025-01-01', 120.5, 1000000),
    ('600519', '2025-01-02', 121.2, 950000),
    ('601899', '2025-01-01', 8.5, 5000000)
]
cursor.executemany('''
INSERT OR IGNORE INTO cleaned_stock_data 
(stock_code, trade_date, close, volume) 
VALUES (?, ?, ?, ?)
''', test_data)

# 测试插入prediction_results表
pred_data = [
    ('600519', 122.0, 0.95, '1d', 'LLM'),
    ('600519', 121.8, 0.92, '1d', 'ML'),
    ('601899', 8.6, 0.88, '3d', 'MovingAvg')
]
cursor.executemany('''
INSERT INTO prediction_results 
(stock_code, prediction, confidence, horizon, model_type) 
VALUES (?, ?, ?, ?, ?)
''', pred_data)

# 关键：提交事务（缺一不可）
conn.commit()

# 查询验证
cursor.execute('SELECT COUNT(*) FROM cleaned_stock_data')
print(f"cleaned_stock_data 数据量：{cursor.fetchone()[0]}")

cursor.execute('SELECT COUNT(*) FROM prediction_results')
print(f"prediction_results 数据量：{cursor.fetchone()[0]}")

# 关闭连接
conn.close()
import sqlite3

# 连接到数据库
conn = sqlite3.connect('stock_pred.db')
cursor = conn.cursor()

# 查询所有表名
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

print("数据库中的表：")
for table in tables:
    print(f"- {table[0]}")

# 检查表结构（可选）
print("\n--- 表结构详情 ---")
for table in tables:
    table_name = table[0]
    print(f"\n{table_name}:")
    cursor.execute(f"PRAGMA table_info({table_name});")
    columns = cursor.fetchall()
    for col in columns:
        print(f"  {col[1]} ({col[2]})")

# 关闭连接
conn.close()
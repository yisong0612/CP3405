import subprocess
import sys
import os

# 严格遵循指定执行顺序：create_tables.py → get_raw_data.py → clean_data.py → data_pipeline.py
EXECUTE_ORDER = [
    "create_tables.py",
    "get_raw_data.py",
    "clean_data.py",
    "data_pipeline.py"
]


def run_single_script(script_name, step):
    """执行单个脚本，打印详细日志，判断执行结果"""
    print(f"\n{'=' * 50}")
    print(f"【第{step}步】开始执行：{script_name}")
    print(f"执行顺序：{EXECUTE_ORDER}")
    print(f"{'=' * 50}")

    # 检查脚本是否存在
    if not os.path.exists(script_name):
        print(f"❌ 错误：找不到脚本文件 {script_name}，请确认所有4个脚本在同一文件夹！")
        return False

    try:
        # 执行脚本，捕获输出和错误
        result = subprocess.run(
            [sys.executable, script_name],
            check=True,
            capture_output=True,
            text=True,
            encoding="utf-8"
        )
        # 打印脚本执行的正常输出
        if result.stdout:
            print("脚本输出：")
            print(result.stdout)
        print(f"✅ 【第{step}步】执行成功：{script_name}")
        return True

    except subprocess.CalledProcessError as e:
        # 脚本执行失败，打印错误信息，增加对应报错提示
        print(f"❌ 【第{step}步】执行失败：{script_name}")
        print(f"错误详情：{e.stderr}")
        if script_name == "get_raw_data.py":
            print("💡 解决方案：脚本已适配连接/字段问题，确保依赖（pandas、tushare）已安装")
        if script_name == "data_pipeline.py" and "IndexError" in e.stderr:
            print("💡 解决方案：演示数据为空，已优化脚本，重新运行即可")
        return False


if __name__ == "__main__":
    print("=" * 50)
    print("开始按指定顺序执行所有数据库脚本")
    print(f"执行顺序：{' → '.join(EXECUTE_ORDER)}")
    print("=" * 50)

    # 按顺序执行所有脚本，一步失败则停止
    all_successful = True
    for idx, script in enumerate(EXECUTE_ORDER, start=1):
        if not run_single_script(script, idx):
            all_successful = False
            print(f"\n❌ 执行中断：{script} 执行失败，请修复后重试！")
            break

    # 最终结果汇总
    print(f"\n{'=' * 50}")
    if all_successful:
        print("🎉 所有脚本按指定顺序执行完成！")
        print("核心产出文件：")
        print("1. stock_pred.db —— 数据库（含3张核心表）")
        print("2. cleaned_benchmark_data.csv —— 基准数据集（团队共用）")
        print("3. cleaned_demo_data.csv —— 演示数据集（现场使用）")
    else:
        print("❌ 执行未完成，请根据错误信息排查问题后重试。")
    print("=" * 50)
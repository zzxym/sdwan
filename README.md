## 项目介绍
本项目来源于easytier开源项目。基于自用需求，重新定义部分功能。仅限于自用，不商用，不说明，不回答。所以不建议基于我这个版本的二开。如果有需要二开，请使用easytier项目
https://github.com/easytier/easytier.git

## 编译流程

### win上编译
在 Windows 11 上编译项目，核心是安装Rust 工具链和C 语言编译环境（Tokio 部分依赖需 C 编译），步骤如下：
1. 安装 Rust 工具链（核心依赖）
Rust 官方工具链包含编译器（rustc）、包管理器（cargo）等，是编译 Rust 项目的基础。
打开 Windows 终端（PowerShell 或 CMD），输入以下命令，按提示完成安装：
bash
Invoke-WebRequest https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe -OutFile rustup-init.exe
.\rustup-init.exe
这个命令会下载 Rust 的 Windows 安装程序并运行它，之后你可以按照安装向导的提示完成安装过程。安装完成后，记得重启你的终端让环境变量生效。

安装完成后，关闭当前终端并重新打开，输入 rustc --version 验证，若显示版本号（如 rustc 1.75.0 (82e1608df 2023-12-21)），则安装成功。
2. 安装 C 语言编译环境（Tokio 依赖）
Tokio 的部分底层依赖（如异步 I/O、计时器）需要 C 语言编译器，Windows 需安装Microsoft Visual C++ Build Tools。
下载并运行 Visual Studio 生成工具（无需安装完整 VS）。
安装时，在 “工作负载” 中勾选 “使用 C++ 的桌面开发”，直接点击 “安装”（默认组件已满足需求，无需额外勾选）。
安装完成后，重启终端，确保 C 编译器（cl.exe）能被系统识别。
#### 编译步骤
cd /easytier/tauri-plugin-vpnservice
pnpm install
pnpm build

cd ../easytier-web/frontend-lib
pnpm install
pnpm build
#编译后端
cd ../../easytier
pnpm install
cargon build

cd ../easytier-gui
pnpm install
pnpm tauri build


### Ubuntu上编译


@echo off
REM git-sync.bat — 在仓库根目录运行，自动添加、提交并推送特定修改。
REM 注意：请先确保本机已安装 Git，并且在仓库目录中有正确的远程 origin/分支权限。
cd /d "%~dp0"

:: 检查是否是 git 仓库
git rev-parse --is-inside-work-tree >nul 2>&1
if ERRORLEVEL 1 (
  echo 不是一个 Git 仓库或 Git 未安装，请在本机环境检查后再运行。
  pause
  exit /b 1
)

:: 要提交的文件列表（按需修改）
set FILES="web\obsidian-theme.css" "web\index.html" "web\project\index.html"

:: 暂存文件
echo 添加文件到暂存区...
git add %FILES%

:: 检查是否有 staged 变更
git diff --cached --quiet
if ERRORLEVEL 1 (
  echo 有变更，正在提交...
  git commit -m "Add Obsidian-like theme and KaTeX auto-render; include Google Fonts" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
  if ERRORLEVEL 1 (
    echo 提交失败，请检查错误信息。
    pause
    exit /b 1
  )
  echo 正在推送到 origin main...
  git push origin main
  if ERRORLEVEL 1 (
    echo 推送失败。请检查远程设置或认证（SSH key / PAT）。
    pause
    exit /b 1
  )
  echo 推送成功。
) else (
  echo 没有要提交的变更。
)
pause
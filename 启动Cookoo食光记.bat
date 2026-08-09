@echo off
chcp 65001 >nul
title Cookoo 食光记 - 本地服务启动器

:: 自动切换到 Cookoo 项目实际存储路径
cd /d "d:\CodeProjects\cooker"

echo ======================================================
echo          🐱‍🍳 Cookoo 食光记 · 智能菜谱系统
echo ======================================================
echo 工作目录: %cd%
echo [1/3] 正在启动本地独立文件数据库 (端口 3001)...
start "Cookoo-Database" /b node server.js

echo [2/3] 正在准备打开浏览器页面...
start "" http://localhost:5173/

echo [3/3] 正在启动前端服务 (npm run dev)...
echo ======================================================
echo 提示：关闭此黑框窗口即停止服务，请在使用时保持窗口开启。
echo ======================================================
echo.

call npm run dev -- --host --port 5173

pause

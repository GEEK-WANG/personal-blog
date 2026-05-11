<?php
// 启动会话
session_start();

// 引入配置文件
require_once 'config.php';
require_once 'functions.php';

// 路由处理
$uri = $_SERVER['REQUEST_URI'];

// 移除查询字符串
$uri = strtok($uri, '?');

// 移除backend前缀
$uri = str_replace('/backend', '', $uri);

// 处理带ID的API请求
if (preg_match('/^\/api\/(diary|article|life|record|message)\/\d+$/', $uri)) {
    include 'api.php';
    exit;
}

// 处理登录请求
if ($uri === '/login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // 验证用户名和密码（默认用户名：admin，密码：admin123）
    if ($username === 'admin' && $password === 'admin123') {
        // 设置登录会话
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        
        // 跳转到仪表盘
        header('Location: /backend/dashboard');
        exit;
    } else {
        // 登录失败，显示错误信息
        echo '<!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>登录失败</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    padding: 20px;
                    box-sizing: border-box;
                }
                .login-container {
                    background-color: white;
                    padding: 40px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 350px;
                    box-sizing: border-box;
                }
                h1 {
                    text-align: center;
                    color: #333;
                    margin-bottom: 30px;
                    font-size: 28px;
                }
                .error {
                    color: red;
                    text-align: center;
                    margin-bottom: 20px;
                    padding: 10px;
                    background-color: #ffebee;
                    border-radius: 4px;
                    font-size: 14px;
                }
                .form-group {
                    margin-bottom: 20px;
                }
                label {
                    display: block;
                    margin-bottom: 8px;
                    color: #666;
                    font-size: 14px;
                }
                input {
                    width: 100%;
                    padding: 14px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                    box-sizing: border-box;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                }
                input:focus {
                    outline: none;
                    border-color: #4CAF50;
                    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
                }
                button {
                    width: 100%;
                    padding: 14px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                button:hover {
                    background-color: #45a049;
                }
                button:active {
                    background-color: #3d8b40;
                }
                /* 响应式设计 */
                @media (max-width: 480px) {
                    body {
                        padding: 15px;
                    }
                    .login-container {
                        padding: 30px 20px;
                        max-width: 100%;
                    }
                    h1 {
                        font-size: 24px;
                        margin-bottom: 25px;
                    }
                    .form-group {
                        margin-bottom: 18px;
                    }
                    input {
                        padding: 16px;
                        font-size: 17px;
                        height: 50px;
                    }
                    button {
                        padding: 16px;
                        font-size: 17px;
                        height: 50px;
                    }
                }
                /* 针对iPhone等设备的特殊样式 */
                @media screen and (max-device-width: 480px) and (-webkit-device-pixel-ratio: 2) {
                    input {
                        padding: 18px;
                        font-size: 18px;
                    }
                    button {
                        padding: 18px;
                        font-size: 18px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="login-container">
                <h1>管理员登录</h1>
                <div class="error">用户名或密码错误，请重试</div>
                <form action="/backend/login" method="post">
                    <div class="form-group">
                        <label for="username">用户名</label>
                        <input type="text" id="username" name="username" value="$username" required>
                    </div>
                    <div class="form-group">
                        <label for="password">密码</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit">登录</button>
                </form>
            </div>
        </body>
        </html>';
        exit;
    }
}

// 路由匹配
switch ($uri) {
    case '':
    case '/':
    case '/login':
        include 'login.php';
        break;
    case '/dashboard':
        include 'dashboard.php';
        break;
    case '/api/diary':
    case '/api/article':
    case '/api/life':
    case '/api/record':
    case '/api/message':
        include 'api.php';
        break;
    default:
        // 处理静态文件
        $file_path = __DIR__ . '/public' . $uri;
        if (file_exists($file_path) && is_file($file_path)) {
            // 根据文件类型设置MIME类型
            $extension = pathinfo($file_path, PATHINFO_EXTENSION);
            $mime_types = [
                'jpg' => 'image/jpeg',
                'jpeg' => 'image/jpeg',
                'png' => 'image/png',
                'gif' => 'image/gif',
                'css' => 'text/css',
                'js' => 'application/javascript',
                'html' => 'text/html'
            ];
            
            $mime_type = isset($mime_types[$extension]) ? $mime_types[$extension] : 'application/octet-stream';
            header('Content-Type: ' . $mime_type);
            readfile($file_path);
            exit;
        } else {
            // 404页面
            http_response_code(404);
            echo '404 Not Found';
        }
        break;
}
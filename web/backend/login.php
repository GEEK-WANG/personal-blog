<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>管理员登录</title>
    <link rel="icon" type="image/png" href="../images/icon.png">
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
        <form action="/backend/login" method="post">
            <div class="form-group">
                <label for="username">用户名</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit">登录</button>
        </form>
    </div>
</body>
</html>
<?php
// 启动会话
session_start();

// 检查是否登录
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    // 未登录，跳转到登录页
    header('Location: /backend/login');
    exit;
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>管理员仪表盘</title>
    <link rel="icon" type="image/png" href="../images/icon.png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            height: 100vh;
            overflow: hidden;
        }
        .container {
            display: flex;
            height: 100vh;
        }
        /* 顶部导航栏（手机端） */
        .top-nav {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background-color: #333;
            color: white;
            padding: 15px;
            z-index: 1001;
        }
        .menu-toggle {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
        }
        .top-nav h2 {
            margin: 0;
            font-size: 18px;
            text-align: center;
            flex: 1;
        }
        /* 左侧侧边栏 */
        .sidebar {
            width: 250px;
            background-color: #333;
            color: white;
            padding: 20px;
            position: relative;
            z-index: 1000;
            transition: transform 0.3s ease-in-out;
        }
        .sidebar h1 {
            font-size: 24px;
            margin-bottom: 30px;
            text-align: center;
        }
        .sidebar-nav {
            list-style: none;
        }
        .sidebar-nav li {
            margin-bottom: 10px;
        }
        .sidebar-nav button {
            width: 100%;
            padding: 12px;
            background: none;
            border: none;
            color: white;
            text-align: left;
            font-size: 16px;
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        .sidebar-nav button:hover {
            background-color: #555;
        }
        .sidebar-nav button.active {
            background-color: #4CAF50;
        }
        /* 右侧主内容区 */
        .main-content {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            transition: margin-left 0.3s ease-in-out;
        }
        .current-date {
            text-align: right;
            margin-bottom: 20px;
            color: #666;
            font-size: 14px;
        }
        .content-section {
            background-color: #fff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }
        .add-form {
            margin-bottom: 30px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            color: #666;
        }
        input[type="text"],
        input[type="date"],
        input[type="datetime-local"],
        textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        textarea {
            resize: vertical;
            min-height: 100px;
        }
        input[type="file"] {
            margin-top: 5px;
        }
        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        .btn-primary {
            background-color: #4CAF50;
            color: white;
        }
        .btn-primary:hover {
            background-color: #45a049;
        }
        .btn-secondary {
            background-color: #2196F3;
            color: white;
        }
        .btn-secondary:hover {
            background-color: #0b7dda;
        }
        .btn-danger {
            background-color: #f44336;
            color: white;
        }
        .btn-danger:hover {
            background-color: #da190b;
        }
        .content-list {
            margin-top: 30px;
        }
        .content-item {
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin-bottom: 20px;
            background-color: #f9f9f9;
        }
        .content-item h3 {
            margin-bottom: 10px;
            color: #333;
        }
        .content-item p {
            margin-bottom: 15px;
            color: #666;
            line-height: 1.5;
        }
        .content-item img {
            max-width: 200px;
            margin-bottom: 15px;
            border-radius: 4px;
        }
        .content-item .date {
            color: #999;
            font-size: 14px;
            margin-bottom: 15px;
        }
        .content-item .actions {
            display: flex;
            gap: 10px;
        }
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }
        .modal-content {
            background-color: white;
            margin: 10% auto;
            padding: 20px;
            border-radius: 8px;
            width: 80%;
            max-width: 600px;
        }
        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }
        .close:hover {
            color: black;
        }
        /* 响应式设计 */
        @media (max-width: 768px) {
            .top-nav {
                display: flex;
                align-items: center;
            }
            .sidebar {
                position: fixed;
                left: 0;
                top: 0;
                height: 100vh;
                transform: translateX(-100%);
            }
            .sidebar.active {
                transform: translateX(0);
            }
            .main-content {
                margin-left: 0;
                padding-top: 60px;
            }
            .content-item .actions {
                flex-direction: column;
            }
            .content-item .actions button {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <!-- 顶部导航栏（手机端） -->
    <div class="top-nav">
        <button class="menu-toggle" onclick="toggleSidebar()">☰</button>
        <h2 id="mobileTitle">管理员仪表盘</h2>
    </div>
    
    <div class="container">
        <!-- 左侧侧边栏 -->
        <div class="sidebar" id="sidebar">
            <h1>管理员仪表盘</h1>
            <ul class="sidebar-nav">
                <li><button class="active" data-type="diary">日记管理</button></li>
                <li><button data-type="article">文章管理</button></li>
                <li><button data-type="life">生活管理</button></li>
                <li><button data-type="record">记录管理</button></li>
                <li><button data-type="message">留言管理</button></li>
                <li><button data-type="intro">介绍管理</button></li>
                <li><button data-type="about">关于管理</button></li>
            </ul>
        </div>
        
        <!-- 右侧主内容区 -->
        <div class="main-content" id="mainContent">
            <div class="current-date" id="currentDate"></div>
            
            <div class="content-section">
                <h2 id="sectionTitle">日记管理</h2>
                
                <div class="add-form">
                    <h3>添加新内容</h3>
                    <form id="addForm" enctype="multipart/form-data">
                        <input type="hidden" id="contentId">
                        <div class="form-group">
                            <label for="title">标题</label>
                            <input type="text" id="title" name="title" required>
                        </div>
                        <div class="form-group">
                            <label for="content">内容</label>
                            <textarea id="content" name="content" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="date">日期时间</label>
                            <input type="datetime-local" id="date" name="date" required>
                        </div>
                        <div class="form-group">
                            <label for="image">图片</label>
                            <input type="file" id="image" name="image" accept="image/*">
                            <div id="imagePreview" style="margin-top: 10px;"></div>
                        </div>
                        <button type="submit" class="btn btn-primary">保存</button>
                        <button type="button" class="btn btn-secondary" id="cancelBtn">取消</button>
                    </form>
                </div>
                
                <div class="content-list" id="contentList">
                    <!-- 内容列表将通过JavaScript动态生成 -->
                </div>
            </div>
        </div>
    </div>
    
    <div class="modal" id="editModal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3>编辑内容</h3>
            <form id="editForm" enctype="multipart/form-data">
                <input type="hidden" id="editId">
                <input type="hidden" id="editImage">
                <div class="form-group">
                    <label for="editTitle">标题</label>
                    <input type="text" id="editTitle" name="title" required>
                </div>
                <div class="form-group">
                    <label for="editContent">内容</label>
                    <textarea id="editContent" name="content" required></textarea>
                </div>
                <div class="form-group">
                    <label for="editDate">日期时间</label>
                    <input type="datetime-local" id="editDate" name="date" required>
                </div>
                <div class="form-group">
                    <label for="editImageInput">图片</label>
                    <input type="file" id="editImageInput" name="image" accept="image/*">
                    <div id="editImagePreview" style="margin-top: 10px;"></div>
                </div>
                <button type="submit" class="btn btn-primary">更新</button>
            </form>
        </div>
    </div>
    
    <script>
        let currentType = 'diary';
        
        // 显示当前日期
        function updateCurrentDate() {
            const now = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            document.getElementById('currentDate').textContent = now.toLocaleString('zh-CN', options);
        }
        
        updateCurrentDate();
        setInterval(updateCurrentDate, 1000);
        
        // 切换侧边栏显示/隐藏
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('active');
        }
        
        // 点击主内容区关闭侧边栏（手机端）
        document.getElementById('mainContent').addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('active');
            }
        });
        
        // 切换内容类型
        document.querySelectorAll('.sidebar-nav button').forEach(button => {
            button.addEventListener('click', function() {
                // 更新按钮状态
                document.querySelectorAll('.sidebar-nav button').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // 更新当前类型
                currentType = this.dataset.type;
                document.getElementById('sectionTitle').textContent = this.textContent;
                document.getElementById('mobileTitle').textContent = this.textContent;
                
                // 重置表单
                resetForm();
                
                // 控制添加表单的显示
                const addForm = document.querySelector('.add-form');
                const titleField = document.querySelector('.form-group:nth-child(1)');
                const imageField = document.querySelector('.form-group:nth-child(4)');
                
                if (currentType === 'message') {
                    addForm.style.display = 'none';
                } else if (currentType === 'intro' || currentType === 'about') {
                    addForm.style.display = 'block';
                    // 隐藏标题和图片字段
                    titleField.style.display = 'none';
                    imageField.style.display = 'none';
                } else {
                    addForm.style.display = 'block';
                    // 显示标题和图片字段
                    titleField.style.display = 'block';
                    imageField.style.display = 'block';
                }
                
                // 加载内容
                loadContent();
                
                // 在手机端点击后关闭侧边栏
                if (window.innerWidth <= 768) {
                    document.getElementById('sidebar').classList.remove('active');
                }
            });
        });
        
        // 重置表单
        function resetForm() {
            document.getElementById('contentId').value = '';
            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
            document.getElementById('date').value = '';
            document.getElementById('image').value = '';
            document.getElementById('imagePreview').innerHTML = '';
        }
        
        // 加载内容
        function loadContent() {
            fetch(`api.php?type=${currentType}`)
                .then(response => response.json())
                .then(data => {
                    const contentList = document.getElementById('contentList');
                    contentList.innerHTML = '';
                    
                    data.forEach(item => {
                        const contentItem = document.createElement('div');
                        contentItem.className = 'content-item';
                        
                        if (currentType === 'message') {
                            // 留言类型的显示格式
                            contentItem.innerHTML = `
                                <h3>${item.subject}</h3>
                                <div class="date">${item.date}</div>
                                <p><strong>姓名：</strong>${item.name}</p>
                                <p><strong>邮箱：</strong>${item.email}</p>
                                <p><strong>内容：</strong>${item.content}</p>
                                <div class="actions">
                                    <button class="btn btn-danger" onclick="deleteContent(${item.id})">删除</button>
                                </div>
                            `;
                        } else if (currentType === 'intro' || currentType === 'about') {
                            // 介绍和关于类型的显示格式
                            contentItem.innerHTML = `
                                <h3>${currentType === 'intro' ? '网站历史' : '关于我'}</h3>
                                <div class="date">${item.date}</div>
                                <p>${item.content.substring(0, 100)}${item.content.length > 100 ? '...' : ''}</p>
                                <div class="actions">
                                    <button class="btn btn-secondary" onclick="editContent(${item.id})">编辑</button>
                                    <button class="btn btn-danger" onclick="deleteContent(${item.id})">删除</button>
                                </div>
                            `;
                        } else {
                            // 其他类型的显示格式
                            contentItem.innerHTML = `
                                <h3>${item.title}</h3>
                                <div class="date">${item.date}</div>
                                ${item.image ? `<img src="${item.image}" alt="${item.title}">` : ''}
                                <p>${item.content}</p>
                                <div class="actions">
                                    <button class="btn btn-secondary" onclick="editContent(${item.id})">编辑</button>
                                    <button class="btn btn-danger" onclick="deleteContent(${item.id})">删除</button>
                                </div>
                            `;
                        }
                        
                        contentList.appendChild(contentItem);
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                    const contentList = document.getElementById('contentList');
                    contentList.innerHTML = '<p style="color: red; text-align: center;">加载失败，请检查网络连接</p>';
                });
        }
        
        // 保存内容
        document.getElementById('addForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const id = document.getElementById('contentId').value;
            const formData = new FormData(this);
            
            // 对于intro和about类型，移除不需要的字段
            if (currentType === 'intro' || currentType === 'about') {
                formData.delete('title');
                formData.delete('image');
            }
            
            if (id) {
                // 更新内容
                fetch(`api.php?type=${currentType}&id=${id}`, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    resetForm();
                    loadContent();
                })
                .catch(error => console.error('Error:', error));
            } else {
                // 添加内容
                fetch(`api.php?type=${currentType}`, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    resetForm();
                    loadContent();
                })
                .catch(error => console.error('Error:', error));
            }
        });
        
        // 编辑内容
        function editContent(id) {
            fetch(`api.php?type=${currentType}`)
                .then(response => response.json())
                .then(data => {
                    const item = data.find(item => item.id === id);
                    if (item) {
                        document.getElementById('editId').value = item.id;
                        
                        // 获取编辑模态框中的字段
                        const editTitleField = document.querySelector('#editModal .form-group:nth-child(1)');
                        const editImageField = document.querySelector('#editModal .form-group:nth-child(4)');
                        
                        if (currentType === 'intro' || currentType === 'about') {
                            // 对于intro和about类型，隐藏标题和图片字段
                            editTitleField.style.display = 'none';
                            editImageField.style.display = 'none';
                        } else {
                            // 对于其他类型，显示标题和图片字段
                            editTitleField.style.display = 'block';
                            editImageField.style.display = 'block';
                            document.getElementById('editTitle').value = item.title;
                            document.getElementById('editImage').value = item.image;
                            document.getElementById('editImagePreview').innerHTML = item.image ? `<img src="${item.image}" alt="${item.title}" style="max-width: 200px;">` : '';
                        }
                        
                        document.getElementById('editContent').value = item.content;
                        document.getElementById('editDate').value = item.date;
                        document.getElementById('editModal').style.display = 'block';
                    }
                })
                .catch(error => console.error('Error:', error));
        }
        
        // 关闭编辑模态框
        document.querySelector('.close').addEventListener('click', function() {
            document.getElementById('editModal').style.display = 'none';
        });
        
        // 点击模态框外部关闭
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('editModal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // 提交编辑表单
        document.getElementById('editForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const id = document.getElementById('editId').value;
            const formData = new FormData(this);
            
            // 对于intro和about类型，移除不需要的字段
            if (currentType === 'intro' || currentType === 'about') {
                formData.delete('title');
                formData.delete('image');
            } else {
                // 如果没有选择新图片，使用旧图片
                if (!formData.get('image')) {
                    formData.append('image', document.getElementById('editImage').value);
                }
            }
            
            fetch(`api.php?type=${currentType}&id=${id}`, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('editModal').style.display = 'none';
                loadContent();
            })
            .catch(error => console.error('Error:', error));
        });
        
        // 删除内容
        function deleteContent(id) {
            if (confirm('确定要删除吗？')) {
                fetch(`api.php?type=${currentType}&id=${id}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    loadContent();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('删除失败，请检查网络连接');
                });
            }
        }
        
        // 取消按钮
        document.getElementById('cancelBtn').addEventListener('click', resetForm);
        
        // 图片预览
        document.getElementById('image').addEventListener('change', function(e) {
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = '';
            
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '200px';
                    img.style.borderRadius = '4px';
                    preview.appendChild(img);
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
        
        document.getElementById('editImageInput').addEventListener('change', function(e) {
            const preview = document.getElementById('editImagePreview');
            preview.innerHTML = '';
            
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '200px';
                    img.style.borderRadius = '4px';
                    preview.appendChild(img);
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
        
        // 初始化加载内容
        loadContent();
    </script>
</body>
</html>
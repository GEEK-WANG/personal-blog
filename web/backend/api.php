<?php
require_once 'config.php';
require_once 'functions.php';

// 检查用户是否登录
// if (!isLoggedIn()) {
//     errorResponse('请先登录', 401);
// }

// 获取API路径
$uri = $_SERVER['REQUEST_URI'];
// 移除backend前缀
$uri = str_replace('/backend', '', $uri);
$parts = explode('/', rtrim($uri, '/'));

// 验证类型
$validTypes = ['diary', 'article', 'life', 'record', 'message', 'intro', 'about'];
// 优先从GET参数获取type，如果没有则检查POST参数
$type = $_GET['type'] ?? $_POST['type'] ?? $parts[2] ?? 'message';

if (!in_array($type, $validTypes)) {
    $type = 'message'; // 默认为message类型
}

// 获取请求方法
$method = getRequestMethod();

// 获取ID（如果存在）
// 优先从GET参数获取id
$id = $_GET['id'] ?? $parts[3] ?? null;
if ($id && !is_numeric($id)) {
    $id = null;
}

// 处理不同的请求方法
switch ($method) {
    case 'GET':
        // 获取所有内容
        $db = getDatabase();
        $stmt = $db->prepare("SELECT * FROM $type ORDER BY date DESC");
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        jsonResponse($data);
        break;
        
    case 'POST':
        // 处理添加或更新操作
        $db = getDatabase();
        
        if ($id) {
            // 更新内容
            if ($type === 'message') {
                // 处理留言更新
                $name = $_POST['name'] ?? '';
                $email = $_POST['email'] ?? '';
                $subject = $_POST['subject'] ?? '';
                $content = $_POST['content'] ?? '';
                $date = $_POST['date'] ?? date('Y-m-d H:i:s');
                
                // 更新数据
                $stmt = $db->prepare("UPDATE $type SET name = ?, email = ?, subject = ?, content = ?, date = ? WHERE id = ?");
                $stmt->execute([$name, $email, $subject, $content, $date, $id]);
            } elseif ($type === 'intro' || $type === 'about') {
                // 处理介绍和关于更新
                $content = $_POST['content'] ?? '';
                $date = $_POST['date'] ?? date('Y-m-d H:i:s');
                
                // 更新数据
                $stmt = $db->prepare("UPDATE $type SET content = ?, date = ? WHERE id = ?");
                $stmt->execute([$content, $date, $id]);
            } else {
                // 处理其他类型更新
                $title = $_POST['title'] ?? '';
                $content = $_POST['content'] ?? '';
                $date = $_POST['date'] ?? '';
                
                // 获取原有图片
                $stmt = $db->prepare("SELECT image FROM $type WHERE id = ?");
                $stmt->execute([$id]);
                $existingData = $stmt->fetch(PDO::FETCH_ASSOC);
                $image = $existingData['image'] ?? null;
                
                // 处理文件上传
                if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                    $uploadDir = __DIR__ . '/public/uploads/';
                    if (!file_exists($uploadDir)) {
                        mkdir($uploadDir, 0777, true);
                    }
                    
                    $filename = uniqid() . '_' . basename($_FILES['image']['name']);
                    $filePath = $uploadDir . $filename;
                    
                    if (move_uploaded_file($_FILES['image']['tmp_name'], $filePath)) {
                        $image = '/uploads/' . $filename;
                    }
                }
                
                // 更新数据
                $stmt = $db->prepare("UPDATE $type SET title = ?, content = ?, date = ?, image = ? WHERE id = ?");
                $stmt->execute([$title, $content, $date, $image, $id]);
            }
            
            $changes = $stmt->rowCount();
            jsonResponse(['id' => $id, 'changes' => $changes, 'status' => 'success', 'message' => '更新成功']);
        } else {
            // 添加新内容
            if ($type === 'message') {
                // 处理留言
                $name = $_POST['name'] ?? '';
                $email = $_POST['email'] ?? '';
                $subject = $_POST['subject'] ?? '';
                $content = $_POST['content'] ?? '';
                $date = date('Y-m-d H:i:s'); // 当前时间
                
                // 插入数据
                $stmt = $db->prepare("INSERT INTO $type (name, email, subject, content, date) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([$name, $email, $subject, $content, $date]);
                $lastId = $db->lastInsertId();
            } elseif ($type === 'intro' || $type === 'about') {
                // 处理介绍和关于
                $content = $_POST['content'] ?? '';
                $date = date('Y-m-d H:i:s'); // 当前时间
                
                // 插入数据
                $stmt = $db->prepare("INSERT INTO $type (content, date) VALUES (?, ?)");
                $stmt->execute([$content, $date]);
                $lastId = $db->lastInsertId();
            } else {
                // 处理其他类型
                $title = $_POST['title'] ?? '';
                $content = $_POST['content'] ?? '';
                $date = $_POST['date'] ?? '';
                $image = null;
                
                // 处理文件上传
                if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                    $uploadDir = __DIR__ . '/public/uploads/';
                    if (!file_exists($uploadDir)) {
                        mkdir($uploadDir, 0777, true);
                    }
                    
                    $filename = uniqid() . '_' . basename($_FILES['image']['name']);
                    $filePath = $uploadDir . $filename;
                    
                    if (move_uploaded_file($_FILES['image']['tmp_name'], $filePath)) {
                        $image = '/uploads/' . $filename;
                    }
                }
                
                // 插入数据
                $stmt = $db->prepare("INSERT INTO $type (title, content, date, image) VALUES (?, ?, ?, ?)");
                $stmt->execute([$title, $content, $date, $image]);
                $lastId = $db->lastInsertId();
            }
            
            jsonResponse(['id' => $lastId, 'status' => 'success', 'message' => '提交成功']);
        }
        break;
        
    case 'PUT':
        // 更新内容
        if (!$id) {
            errorResponse('缺少ID参数', 400);
        }
        
        $db = getDatabase();
        
        // 获取原有数据
        $stmt = $db->prepare("SELECT * FROM $type WHERE id = ?");
        $stmt->execute([$id]);
        $existingData = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$existingData) {
            errorResponse('内容不存在', 404);
        }
        
        // 处理PUT请求数据
        parse_str(file_get_contents('php://input'), $putData);
        
        // 获取表单数据，优先使用PUT数据，否则使用原有数据
        $title = isset($putData['title']) ? $putData['title'] : $existingData['title'];
        $content = isset($putData['content']) ? $putData['content'] : $existingData['content'];
        $date = isset($putData['date']) ? $putData['date'] : $existingData['date'];
        $image = $existingData['image']; // 默认为原有图片
        
        // 更新数据
        $stmt = $db->prepare("UPDATE $type SET title = ?, content = ?, date = ?, image = ? WHERE id = ?");
        $stmt->execute([$title, $content, $date, $image, $id]);
        $changes = $stmt->rowCount();
        
        jsonResponse(['changes' => $changes]);
        break;
        
    case 'DELETE':
        // 删除内容
        if (!$id) {
            errorResponse('缺少ID参数', 400);
        }
        
        $db = getDatabase();
        $stmt = $db->prepare("DELETE FROM $type WHERE id = ?");
        $stmt->execute([$id]);
        $changes = $stmt->rowCount();
        
        jsonResponse(['changes' => $changes]);
        break;
        
    default:
        errorResponse('不支持的请求方法', 405);
        break;
}
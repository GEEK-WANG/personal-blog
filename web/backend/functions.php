<?php
// 检查用户是否登录
function isLoggedIn() {
    return isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] === true;
}

// 重定向函数
function redirect($url) {
    header('Location: ' . $url);
    exit;
}

// 上传文件函数
function uploadFile($file) {
    if (!isset($file['error']) || $file['error'] !== UPLOAD_ERR_OK) {
        return false;
    }
    
    // 检查文件类型
    if (!in_array($file['type'], ALLOWED_IMAGE_TYPES)) {
        return false;
    }
    
    // 检查文件大小
    if ($file['size'] > MAX_UPLOAD_SIZE) {
        return false;
    }
    
    // 生成唯一文件名
    $filename = time() . '_' . uniqid() . '.' . pathinfo($file['name'], PATHINFO_EXTENSION);
    $destination = UPLOAD_DIR . $filename;
    
    // 移动文件
    if (move_uploaded_file($file['tmp_name'], $destination)) {
        return UPLOAD_URL . $filename;
    }
    
    return false;
}

// JSON响应函数
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// 错误响应函数
function errorResponse($message, $statusCode = 500) {
    jsonResponse(['error' => $message], $statusCode);
}

// 获取请求方法
function getRequestMethod() {
    return $_SERVER['REQUEST_METHOD'];
}

// 获取请求体
function getRequestBody() {
    return json_decode(file_get_contents('php://input'), true);
}

// 获取URL参数
function getUrlParam($param) {
    $uri = $_SERVER['REQUEST_URI'];
    $parts = explode('/', rtrim($uri, '/'));
    $index = array_search($param, $parts);
    if ($index !== false && isset($parts[$index + 1])) {
        return $parts[$index + 1];
    }
    return null;
}
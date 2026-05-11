<?php
// 数据库配置
define('DB_FILE', __DIR__ . '/dashboard.db');

// 上传配置
define('UPLOAD_DIR', __DIR__ . '/public/uploads/');
define('UPLOAD_URL', '/backend/public/uploads/');

// 允许的图片类型
define('ALLOWED_IMAGE_TYPES', ['image/jpeg', 'image/png', 'image/gif']);

// 最大上传文件大小（2MB）
define('MAX_UPLOAD_SIZE', 2 * 1024 * 1024);

// 初始化数据库
function initDatabase() {
    $db = new PDO('sqlite:' . DB_FILE);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // 创建用户表
    $db->exec('CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )');
    
    // 创建日记表
    $db->exec('CREATE TABLE IF NOT EXISTS diary (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        date TEXT,
        image TEXT
    )');
    
    // 创建文章表
    $db->exec('CREATE TABLE IF NOT EXISTS article (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        date TEXT,
        image TEXT
    )');
    
    // 创建生活表
    $db->exec('CREATE TABLE IF NOT EXISTS life (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        date TEXT,
        image TEXT
    )');
    
    // 创建记录表
    $db->exec('CREATE TABLE IF NOT EXISTS record (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        date TEXT,
        image TEXT
    )');
    
    // 创建留言表
    $db->exec('CREATE TABLE IF NOT EXISTS message (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        subject TEXT,
        content TEXT,
        date TEXT
    )');
    
    // 创建介绍表
    $db->exec('CREATE TABLE IF NOT EXISTS intro (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        date TEXT
    )');
    
    // 创建关于表
    $db->exec('CREATE TABLE IF NOT EXISTS about (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        date TEXT
    )');
    
    // 检查是否存在管理员用户
    $stmt = $db->prepare('SELECT * FROM users WHERE username = ?');
    $stmt->execute(['admin']);
    $user = $stmt->fetch();
    
    if (!$user) {
        // 创建默认管理员用户，密码为admin123
        $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
        $stmt = $db->prepare('INSERT INTO users (username, password) VALUES (?, ?)');
        $stmt->execute(['admin', $hashedPassword]);
    }
    
    return $db;
}

// 获取数据库连接
function getDatabase() {
    static $db = null;
    if ($db === null) {
        $db = initDatabase();
    }
    return $db;
}

// 确保上传目录存在
if (!file_exists(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}
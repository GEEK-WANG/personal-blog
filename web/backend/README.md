# 后端仪表盘部署指南（PHP版本）

## 项目结构

```
web/
├── backend/            # 后端仪表盘
│   ├── public/         # 静态文件
│   │   └── uploads/    # 上传的图片
│   ├── views/          # 视图文件（保留原文件，实际使用PHP文件）
│   ├── .htaccess       # Apache重写规则
│   ├── config.php      # 配置文件
│   ├── functions.php   # 通用函数
│   ├── index.php       # 入口文件
│   ├── login.php       # 登录页面
│   ├── dashboard.php   # 仪表盘主页面
│   ├── api.php         # API接口
│   └── README.md       # 部署指南
├── css/                # 前端样式
├── font/               # 字体文件
├── img/                # 图片文件
├── js/                 # 前端脚本
├── mp4/                # 视频文件
├── my/                 # TIES区域页面
└── index.html          # 主页
```

## 部署步骤

### 1. 准备服务器

确保你的服务器满足以下要求：
- 安装了PHP 7.0+（推荐PHP 7.4+）
- 安装了SQLite3扩展
- 安装了Apache服务器并启用了mod_rewrite
- 有足够的存储空间

### 2. 上传文件

将整个`web`文件夹上传到你的服务器上，比如上传到`/home/vol7_4/uuk.pp.ua/uu666_40064473`目录下。

### 3. 配置权限

确保以下目录有写入权限：
- `backend/public/uploads/` - 用于存储上传的图片

### 4. 访问仪表盘

打开浏览器访问：
- 后端仪表盘：`http://myzs.uuk.pp.ua/backend`

### 5. 登录仪表盘

使用默认用户名和密码登录：
- 用户名：`admin`
- 密码：`admin123`

### 6. 配置（可选）

- **修改密码**：登录后修改密码，或直接修改数据库中的密码字段
- **修改上传设置**：编辑`config.php`文件中的上传配置
- **修改数据库**：默认使用SQLite，如需使用MySQL，需修改`config.php`中的数据库连接代码

## 功能说明

- **登录功能**：管理员登录验证
- **内容管理**：增删改查日记、文章、生活、记录内容
- **图片上传**：支持上传图片到`public/uploads`目录
- **时间显示**：仪表盘实时显示当前时间日期

## 注意事项

- 确保`public/uploads`目录有写入权限
- 定期备份数据库文件（`dashboard.db`）
- 生产环境中建议修改默认管理员密码
- 如需使用HTTPS，可配置服务器的SSL证书

## 故障排除

- **404错误**：检查Apache的mod_rewrite是否启用，确保.htaccess文件正确配置
- **图片上传失败**：检查`public/uploads`目录权限
- **数据库连接失败**：检查SQLite3扩展是否安装
- **PHP版本问题**：确保服务器使用PHP 7.0+版本

## API接口

- **GET /backend/api/{type}** - 获取指定类型的所有内容
- **POST /backend/api/{type}** - 添加新内容
- **PUT /backend/api/{type}/{id}** - 更新指定ID的内容
- **DELETE /backend/api/{type}/{id}** - 删除指定ID的内容

其中`{type}`可以是`diary`、`article`、`life`或`record`
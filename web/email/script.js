// 侧边栏切换
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    menuToggle.classList.toggle('active');
});

// 点击外部关闭侧边栏
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
        menuToggle.classList.remove('active');
    }
});

// 发送留言函数
function sendMessage(event) {
    event.preventDefault();
    
    const senderName = document.getElementById('senderName').value;
    const senderEmail = document.getElementById('senderEmail').value;
    const messageSubject = document.getElementById('messageSubject').value;
    const messageContent = document.getElementById('messageContent').value;
    const messageStatus = document.getElementById('messageStatus');
    const sendBtn = document.getElementById('sendBtn');
    
    // 显示发送中状态
    sendBtn.disabled = true;
    sendBtn.textContent = '提交中...';
    messageStatus.innerHTML = '<div class="status">正在提交留言...</div>';
    
    // 构建表单数据
    const formData = new FormData();
    formData.append('name', senderName);
    formData.append('email', senderEmail);
    formData.append('subject', messageSubject);
    formData.append('content', messageContent);
    
    // 发送POST请求到后端API
    fetch('../backend/api.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('网络响应错误');
        }
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
        if (data.status === 'success') {
            messageStatus.innerHTML = '<div class="status success">留言提交成功！</div>';
            // 重置表单
            document.getElementById('messageForm').reset();
        } else {
            messageStatus.innerHTML = `<div class="status error">留言提交失败：${data.message || '未知错误'}</div>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        messageStatus.innerHTML = `<div class="status error">留言提交失败：${error.message}</div>`;
    })
    .finally(() => {
        // 恢复按钮状态
        sendBtn.disabled = false;
        sendBtn.textContent = '提交留言';
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
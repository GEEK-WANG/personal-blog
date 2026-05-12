// 侧边栏切换
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    menuToggle.classList.toggle('active');
});

// 点击外部关闭侧边栏
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('show');
        menuToggle.classList.remove('active');
    }
});

// 文件夹展开/折叠
function toggleFolder(folderId) {
    const folder = document.getElementById(folderId);
    folder.classList.toggle('open');
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
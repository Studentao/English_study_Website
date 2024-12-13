// 登录验证函数
function checkAuth() {
    if (!sessionStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// 登出函数
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    window.location.href = 'login.html';
}

// 更新用户信息显示
function updateUserInfo() {
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement) {
        userNameElement.textContent = sessionStorage.getItem('username') || 'admin';
    }
} 
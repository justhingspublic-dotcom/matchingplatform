// ==========================================
// 共用 JavaScript (Common Scripts)
// ==========================================

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.getElementById('main-nav');
    if (nav) {
        if (window.scrollY > 10) {
            nav.classList.add('shadow-md');
        } else {
            nav.classList.remove('shadow-md');
        }
    }
});

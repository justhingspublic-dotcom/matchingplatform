document.addEventListener("DOMContentLoaded", function() {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;

    const initialTheme = placeholder.getAttribute('data-theme') || 'light';
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const navHTML = `
    <div class="fixed top-0 left-0 w-full z-50">
        <!-- Utility Top Bar -->
        <div class="bg-primary/90 backdrop-blur-sm py-1 hidden md:block">
            <div class="max-w-7xl mx-auto px-4 flex justify-end items-center gap-6 text-[11px] text-white/90">
                <a href="#" class="hover:text-white transition-colors">網站導覽</a>
                <span class="text-white/30">|</span>
                <a href="#" class="hover:text-white transition-colors bg-white/10 px-2 rounded">常見問答</a>
                <span class="text-white/30">|</span>
                <a href="#" class="hover:text-white transition-colors font-medium">English</a>
                <span class="text-white/30">|</span>
                <div class="flex gap-3 text-xs">
                    <a href="#" class="hover:text-white"><i class="fa-brands fa-facebook"></i></a>
                    <a href="#" class="hover:text-white"><i class="fa-brands fa-line"></i></a>
                </div>
            </div>
        </div>

        <!-- Main Navigation -->
        <nav id="main-nav" class="bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <!-- Brand Name (No Logo) -->
                    <a href="index.html" class="flex items-center gap-4 cursor-pointer">
                        <div class="flex flex-col">
                            <span class="text-xl font-bold text-primary tracking-tight">實證媒合平台</span>
                            <span class="text-[10px] text-gray-400 uppercase tracking-widest -mt-1">Innovation Matchmaking Platform</span>
                        </div>
                    </a>

                    <!-- Desktop Menu -->
                    <div class="hidden lg:flex items-center space-x-6">
                        <a href="challenges.html" class="text-gray-700 text-sm font-bold hover:text-primary transition-colors ${currentPage === 'challenges.html' ? 'text-primary border-b-2 border-primary' : ''}">尋找挑戰</a>
                        <a href="#" class="text-gray-700 text-sm font-bold hover:text-primary transition-colors">計畫資源</a>
                        <a href="#" class="text-gray-700 text-sm font-bold hover:text-primary transition-colors">成功案例</a>
                        <a href="#" class="text-gray-700 text-sm font-bold hover:text-primary transition-colors">關於我們</a>
                        <a href="#" class="flex items-center gap-1.5 text-primary text-sm font-bold hover:text-primary-dark transition-colors">
                            <i class="fa-solid fa-user-circle text-lg"></i> 會員登入
                        </a>
                    </div>
                    
                    <!-- Mobile Menu Button -->
                    <div class="lg:hidden flex items-center">
                         <button class="text-gray-500 focus:outline-none">
                            <i class="fa-solid fa-bars text-xl"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    <div class="h-[88px] hidden md:block"></div> <!-- Spacer for fixed header -->
    <div class="h-[64px] md:hidden"></div>
    `;

    placeholder.innerHTML = navHTML;
});

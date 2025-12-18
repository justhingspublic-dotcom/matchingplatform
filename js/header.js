document.addEventListener("DOMContentLoaded", function() {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;

    const initialTheme = placeholder.getAttribute('data-theme') || 'light'; // 'light' (dark text) or 'dark' (white text)
    // Get current filename, default to index.html if empty (root)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Base classes
    const navClasses = "fixed w-full z-50 transition-all duration-300 bg-transparent";
    const textClasses = initialTheme === 'dark' ? "text-white" : "text-gray-600";
    
    // Logo colors
    const logoBgClasses = initialTheme === 'dark' ? "bg-white text-primary" : "bg-primary text-white";
    const brandTextClasses = initialTheme === 'dark' ? "text-white" : "text-primary";

    // Button colors (Contact Us - using same style as primary button)
    const btnClasses = initialTheme === 'dark' 
        ? "bg-white text-primary hover:bg-gray-100" 
        : "bg-primary text-white hover:bg-blue-800";

    // Nav Link Helper to generate initial classes
    const getLinkClass = (page) => {
        // Simple check: active if href matches current page filename
        const isActive = (currentPage === page) || (page === 'index.html' && currentPage === ''); 
        
        let classes = "px-4 py-2 rounded-full font-medium transition-all duration-300 ";
        
        if (isActive) {
            // Active state
            classes += "font-bold shadow-inner ";
            if (initialTheme === 'dark') {
                classes += "bg-white/20 text-white "; 
            } else {
                classes += "bg-black/10 text-primary ";
            }
        } else {
            // Inactive state hover
            if (initialTheme === 'dark') {
                classes += "hover:bg-white/10 ";
            } else {
                classes += "hover:bg-black/5 hover:text-primary ";
            }
        }
        return classes;
    };

    const navHTML = `
    <nav id="main-nav" class="${navClasses} ${textClasses}">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <!-- Logo -->
                <a href="index.html" class="flex-shrink-0 flex items-center gap-3 cursor-pointer">
                    <div id="nav-logo-bg" class="w-10 h-10 ${logoBgClasses} rounded-lg flex items-center justify-center text-xl shadow-md transition-colors duration-300">
                        <i class="fa-solid fa-lightbulb"></i>
                    </div>
                    <span id="nav-brand-text" class="font-bold text-xl tracking-wide ${brandTextClasses} transition-colors duration-300">實證媒合平台</span>
                </a>

                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center space-x-2">
                    <a href="index.html" class="${getLinkClass('index.html')}">首頁</a>
                    <a href="challenges.html" class="${getLinkClass('challenges.html')}">尋找挑戰</a>
                    <a href="calendar.html" class="${getLinkClass('calendar.html')}">計畫時程</a>
                    <a href="#" class="${getLinkClass('#')}">成功案例</a>
                    <a href="#" class="${getLinkClass('about.html')}">關於我們</a>
                </div>

                <!-- Action Buttons -->
                <div class="hidden md:flex items-center gap-3">
                    <a href="#" id="nav-contact-btn" class="px-5 py-2.5 rounded-full ${btnClasses} font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
                        <i class="fa-solid fa-envelope"></i> 聯絡我們
                    </a>
                </div>
                
                <!-- Mobile Menu Button (Placeholder) -->
                <div class="md:hidden flex items-center">
                     <button class="focus:outline-none">
                        <i class="fa-solid fa-bars text-2xl"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>
    `;

    placeholder.innerHTML = navHTML;

    // --- SCROLL EFFECT LOGIC ---
    const nav = document.getElementById('main-nav');
    const navLogoBg = document.getElementById('nav-logo-bg');
    const navBrandText = document.getElementById('nav-brand-text');
    const navContactBtn = document.getElementById('nav-contact-btn');
    const navLinks = nav.querySelectorAll('.hidden.md\\:flex a');

    function updateNavOnScroll() {
        if (window.scrollY > 10) {
            // === SCROLLED STATE (Common for all pages: Light Frosted Glass) ===
            nav.className = "fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md shadow-sm text-gray-600";

            // Logo -> Primary Style
            navLogoBg.className = "w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center text-xl shadow-md transition-colors duration-300";
            navBrandText.className = "font-bold text-xl tracking-wide text-primary transition-colors duration-300";

            // Contact Button -> Primary Style
            if (navContactBtn) {
                navContactBtn.className = "px-5 py-2.5 rounded-full bg-primary text-white font-medium hover:bg-blue-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2";
            }

            // Links -> Dark Text style
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                const isPageActive = (currentPage === href) || (href === 'index.html' && currentPage === '');
                
                let classes = "px-4 py-2 rounded-full font-medium transition-all duration-300 ";
                if(isPageActive) {
                    classes += "bg-gray-100 text-primary font-bold shadow-inner";
                } else {
                    classes += "text-gray-600 hover:bg-gray-100 hover:text-primary";
                }
                link.className = classes;
            });

        } else {
            // === TOP STATE (Depends on Initial Theme) ===
            nav.className = `fixed w-full z-50 transition-all duration-300 bg-transparent ${initialTheme === 'dark' ? 'text-white' : 'text-gray-600'}`;
            
            if (initialTheme === 'dark') {
                // Dark Theme (White text, White Logo)
                navLogoBg.className = "w-10 h-10 bg-white text-primary rounded-lg flex items-center justify-center text-xl shadow-md transition-colors duration-300";
                navBrandText.className = "font-bold text-xl tracking-wide text-white transition-colors duration-300";
                
                if (navContactBtn) {
                    navContactBtn.className = "px-5 py-2.5 rounded-full bg-white text-primary font-medium hover:bg-gray-100 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2";
                }
                
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    const isPageActive = (currentPage === href) || (href === 'index.html' && currentPage === '');
                    
                    let classes = "px-4 py-2 rounded-full font-medium transition-all duration-300 ";
                    if(isPageActive) {
                        classes += "bg-white/20 text-white font-bold shadow-inner";
                    } else {
                        classes += "hover:bg-white/10";
                    }
                    link.className = classes;
                });

            } else {
                // Light Theme (Dark text, Primary Logo)
                navLogoBg.className = "w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center text-xl shadow-md transition-colors duration-300";
                navBrandText.className = "font-bold text-xl tracking-wide text-primary transition-colors duration-300";
                
                if (navContactBtn) {
                    navContactBtn.className = "px-5 py-2.5 rounded-full bg-primary text-white font-medium hover:bg-blue-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2";
                }

                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    const isPageActive = (currentPage === href) || (href === 'index.html' && currentPage === '');
                    
                    let classes = "px-4 py-2 rounded-full font-medium transition-all duration-300 ";
                    if(isPageActive) {
                        classes += "bg-black/10 text-primary font-bold shadow-inner";
                    } else {
                        classes += "hover:bg-black/5 hover:text-primary";
                    }
                    link.className = classes;
                });
            }
        }
    }

    window.addEventListener('scroll', updateNavOnScroll);
    // Initial check (in case page is refreshed while scrolled)
    updateNavOnScroll();
});

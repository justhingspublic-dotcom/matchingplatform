// ==========================================
// 共用 Tailwind 配置 (Shared Tailwind Config)
// ==========================================
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#005a87',
                secondary: '#4facfe',
                accent: '#ffb400',
                'primary-dark': '#003d5c',
                'bg-light': '#f3f4f6',
                'teal-gov': '#008c95',
                'orange-action': '#e67e55',
            },
            fontFamily: {
                sans: ['Noto Sans TC', 'sans-serif'],
            },
            borderRadius: {
                'none': '0',
                'sm': '0.125rem',
                'DEFAULT': '0.25rem',
                'md': '0.375rem',
                'lg': '0.5rem',
                'xl': '0.75rem',
            }
        }
    }
};

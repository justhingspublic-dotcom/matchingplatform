// ==========================================
// 共用 Tailwind 配置 (Shared Tailwind Config)
// ==========================================
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#003366',
                secondary: '#0089A7',
                accent: '#F2A900',
                'primary-dark': '#002244',
                'bg-light': '#F4F6F9',
                'teal-gov': '#0089A7',
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
                'lg': '0.75rem',
                'xl': '1rem',
                '2xl': '1.5rem',
            },
            boxShadow: {
                'sm': '0 2px 6px rgba(0,0,0,0.06)',
                'DEFAULT': '0 4px 12px rgba(0,0,0,0.08)',
                'md': '0 4px 15px rgba(0,0,0,0.1)',
                'lg': '0 8px 20px rgba(0,0,0,0.12)',
                'xl': '0 8px 24px rgba(0,0,0,0.15)',
                '2xl': '0 12px 32px rgba(0,0,0,0.18)',
            }
        }
    }
};

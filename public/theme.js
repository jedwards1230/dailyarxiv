; (function initTheme() {
    var theme = localStorage.getItem('theme') || 'light'
    var systemtheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (theme === 'dark') {
        document.querySelector('html').classList.add('dark')
    }
    localStorage.setItem('theme', 'dark')
})()
(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  let theme = systemDark.matches ? 'dark' : 'light';

  const moonIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>';
  const sunIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';

  function applyTheme(value) {
    theme = value;
    root.setAttribute('data-theme', theme);
    if (toggle) {
      toggle.setAttribute('aria-label', `Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`);
      toggle.querySelector('.theme-toggle__icon').innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    }
  }

  applyTheme(theme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      applyTheme(theme === 'dark' ? 'light' : 'dark');
    });
  }

  systemDark.addEventListener?.('change', (event) => {
    const hasManualTheme = root.hasAttribute('data-theme') && root.getAttribute('data-theme') !== '';
    if (!hasManualTheme) applyTheme(event.matches ? 'dark' : 'light');
  });

  const nav = document.querySelector('.site-nav');
  const header = document.querySelector('.site-header');
  if (nav && header) {
    const headerHeight = () => header.offsetHeight;
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const id = link.getAttribute('href');
        const target = document.querySelector(id);
        if (!target) return;
        event.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight() - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }
})();
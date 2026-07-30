(() => {
  const storageKey = 'shilong-theme';
  const validChoices = new Set(['system', 'light', 'dark']);
  const root = document.documentElement;
  const colorScheme = matchMedia('(prefers-color-scheme: dark)');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const controls = Array.from(document.querySelectorAll('[data-theme-value]'));

  let choice = validChoices.has(root.dataset.themeChoice)
    ? root.dataset.themeChoice
    : 'system';

  const effectiveTheme = () => (
    choice === 'system' ? (colorScheme.matches ? 'dark' : 'light') : choice
  );

  const applyTheme = () => {
    root.dataset.themeChoice = choice;
    if (choice === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.dataset.theme = choice;
    }

    const effective = effectiveTheme();
    root.style.colorScheme = effective;
    themeColor.content = effective === 'dark' ? '#0d1117' : '#ffffff';
    controls.forEach((control) => {
      control.setAttribute('aria-pressed', String(control.dataset.themeValue === choice));
    });
  };

  controls.forEach((control) => {
    control.addEventListener('click', () => {
      choice = control.dataset.themeValue;
      try {
        localStorage.setItem(storageKey, choice);
      } catch {}
      applyTheme();
    });
  });

  colorScheme.addEventListener('change', () => {
    if (choice === 'system') applyTheme();
  });

  root.dataset.themeEnabled = 'true';
  applyTheme();
})();

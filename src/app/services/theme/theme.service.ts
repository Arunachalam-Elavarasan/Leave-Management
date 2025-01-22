import { Injectable } from '@angular/core';

export type themes = 'light-theme' | 'dark-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme = 'light-theme';

  toggleTheme() {
    const newTheme =
      this.currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.setTheme(newTheme);
  }

  setTheme(theme: string) {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    const rootElement = document.documentElement;

    theme === 'dark-theme'
      ? rootElement.classList.add('dark-theme')
      : rootElement.classList.remove('dark-theme');
  }

  applyStoredTheme(): void {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) this.setTheme(storedTheme);
  }
}

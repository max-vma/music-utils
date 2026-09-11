import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { THEME_STORAGE_KEY, useThemeStore } from './theme';

describe('useThemeStore', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
    setActivePinia(createPinia());
  });

  it('по умолчанию использует светлую тему, если системная не задана', () => {
    const store = useThemeStore();

    expect(store.theme).toBe('light');
    expect(store.isDark).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('берёт сохранённую тему из localStorage', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');

    const store = useThemeStore();

    expect(store.theme).toBe('dark');
    expect(store.isDark).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('переключает тему и сохраняет выбор', () => {
    const store = useThemeStore();

    store.toggleTheme();

    expect(store.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');

    store.toggleTheme();

    expect(store.theme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });

  it('применяет тему, переданную в setTheme', () => {
    const store = useThemeStore();

    store.setTheme('dark');

    expect(store.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    store.setTheme('light');

    expect(store.theme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});

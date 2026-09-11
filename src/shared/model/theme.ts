import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'music-utils-theme';

const DARK_CLASS = 'dark';

function getSystemTheme(): Theme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;

  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    // localStorage может быть недоступен (приватный режим, запрет cookies) — игнорируем.
    return null;
  }
}

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;

  document.documentElement.classList.toggle(DARK_CLASS, theme === 'dark');
}

function persistTheme(theme: Theme) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Сохранение не критично: тема уже применена в текущей сессии.
  }
}

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref((getStoredTheme() ?? getSystemTheme()) === 'dark');

  const theme = computed<Theme>(() => (isDark.value ? 'dark' : 'light'));

  function setTheme(value: Theme) {
    isDark.value = value === 'dark';
    persistTheme(value);
  }

  function toggleTheme() {
    setTheme(isDark.value ? 'light' : 'dark');
  }

  watch(theme, applyTheme, { immediate: true, flush: 'sync' });

  return {
    isDark,
    theme,
    setTheme,
    toggleTheme,
  };
});

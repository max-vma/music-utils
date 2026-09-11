import { createTestingPinia } from '@pinia/testing';
import { fireEvent, render } from '@testing-library/vue';
import { beforeEach, describe, expect, it } from 'vitest';
import { THEME_STORAGE_KEY } from '@/shared/model/theme';
import ThemeToggle from './ThemeToggle.vue';

const renderThemeToggle = (initialState?: { theme: { isDark: boolean } }) =>
  render(ThemeToggle, {
    global: {
      plugins: [
        createTestingPinia({
          stubActions: false,
          initialState,
        }),
      ],
    },
  });

describe('ThemeToggle', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('отрисован как доступный переключатель', () => {
    const { getByRole } = renderThemeToggle();
    const toggle = getByRole('switch');

    expect(toggle).toHaveAttribute('aria-checked', 'false');
    expect(toggle).toHaveAttribute('aria-label', 'Переключить на тёмную тему');
  });

  it('переключает тему по клику и сохраняет выбор', async () => {
    const { getByRole } = renderThemeToggle();
    const toggle = getByRole('switch');

    await fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(toggle).toHaveAttribute('aria-label', 'Переключить на светлую тему');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('отражает тёмную тему из начального состояния стора', () => {
    const { getByRole } = renderThemeToggle({ theme: { isDark: true } });
    const toggle = getByRole('switch');

    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(toggle).toHaveAttribute('aria-label', 'Переключить на светлую тему');
  });
});

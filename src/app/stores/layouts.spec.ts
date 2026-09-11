import { createPinia, setActivePinia } from 'pinia';
import { DefaultLayout, EmptyLayout } from '@/app/layouts';
import { useLayoutStore } from './layouts';

describe('useLayoutStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('по умолчанию использует DefaultLayout', () => {
    const store = useLayoutStore();

    expect(store.currentLayout).toBe('DefaultLayout');
    expect(store.CurrentLayoutComponent).toBe(DefaultLayout);
  });

  it('реактивно меняет CurrentLayoutComponent при смене layout', () => {
    const store = useLayoutStore();

    store.setLayout('EmptyLayout');

    expect(store.currentLayout).toBe('EmptyLayout');
    expect(store.CurrentLayoutComponent).toBe(EmptyLayout);

    store.setLayout('DefaultLayout');

    expect(store.currentLayout).toBe('DefaultLayout');
    expect(store.CurrentLayoutComponent).toBe(DefaultLayout);
  });
});

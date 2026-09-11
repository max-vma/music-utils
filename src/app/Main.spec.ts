import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { DefaultLayout, EmptyLayout } from '@/app/layouts';
import Main from './Main.vue';
import { useLayoutStore } from './stores/layouts';

describe('Main', () => {
  it('отражает смену layout из стора', async () => {
    const pinia = createPinia();

    setActivePinia(pinia);

    const store = useLayoutStore();
    const wrapper = mount(Main, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterView: true,
          RouterLink: true,
          ElContainer: true,
          ElHeader: true,
          ElMain: true,
          ElFooter: true,
          ElMenu: true,
          ElMenuItem: true,
        },
      },
    });

    expect(wrapper.findComponent(DefaultLayout).exists()).toBe(true);
    expect(wrapper.findComponent(EmptyLayout).exists()).toBe(false);

    store.setLayout('EmptyLayout');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(EmptyLayout).exists()).toBe(true);
    expect(wrapper.findComponent(DefaultLayout).exists()).toBe(false);
  });
});

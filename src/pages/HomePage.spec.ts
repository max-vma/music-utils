import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { FRETBOARD_SCALES_URL } from '@/widgets/FretboardScalesControls/consts';
import HomePage from './HomePage.vue';

const RouterLinkStub = {
  props: ['to'],
  template: '<a :href="to"><slot /></a>',
};

const ElCardStub = {
  template: '<div><slot /></div>',
};

const ElButtonStub = {
  props: ['disabled'],
  template: '<button :disabled="disabled"><slot /></button>',
};

const ElTagStub = {
  template: '<span><slot /></span>',
};

const mountHomePage = () =>
  mount(HomePage, {
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
        ElCard: ElCardStub,
        ElButton: ElButtonStub,
        ElTag: ElTagStub,
      },
    },
  });

describe('HomePage', () => {
  it('рендерит ссылку на визуализатор гамм', () => {
    const wrapper = mountHomePage();

    const link = wrapper.find(`a[href="${FRETBOARD_SCALES_URL}"]`);

    expect(link.exists()).toBe(true);
    expect(wrapper.text()).toContain('Визуализатор гамм');
  });

  it('помечает метроном как «скоро» и не даёт по нему перейти', () => {
    const wrapper = mountHomePage();

    const disabledButton = wrapper.find('button[disabled]');

    expect(wrapper.text()).toContain('скоро');
    expect(disabledButton.exists()).toBe(true);
    expect(disabledButton.text()).toContain('Скоро');
  });
});

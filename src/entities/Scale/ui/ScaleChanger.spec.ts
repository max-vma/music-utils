import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { describe, expect, it } from 'vitest';
import { ScaleNames } from '@/entities/Scale/consts';
import ScaleChanger from './ScaleChanger.vue';

const ElFormItemStub = {
  template: '<div><slot /></div>',
};

const ElSelectStub = {
  template: '<div><slot /></div>',
};

const ElOptionStub = {
  props: ['label', 'value'],
  template: '<div class="el-option" :data-value="String(value)">{{ label }}</div>',
};

const mountScaleChanger = () =>
  mount(ScaleChanger, {
    global: {
      plugins: [createPinia()],
      stubs: {
        ElFormItem: ElFormItemStub,
        ElSelect: ElSelectStub,
        ElOption: ElOptionStub,
      },
    },
  });

describe('ScaleChanger', () => {
  it('показывает русские названия гамм вместо ключей enum', () => {
    const wrapper = mountScaleChanger();

    expect(wrapper.text()).toContain('Натуральный минор');
    expect(wrapper.text()).toContain('Лидийский');
    expect(wrapper.text()).not.toContain('NaturalMinor');
  });

  it('показывает ноты с диезами в латинской нотации', () => {
    const wrapper = mountScaleChanger();

    expect(wrapper.text()).toContain('C#');
  });

  it('сопоставляет русское название числовому значению enum', () => {
    const wrapper = mountScaleChanger();

    const option = wrapper.findAll('.el-option').find(item => item.text() === 'Натуральный минор');

    expect(option?.attributes('data-value')).toBe(String(ScaleNames.NaturalMinor));
  });
});

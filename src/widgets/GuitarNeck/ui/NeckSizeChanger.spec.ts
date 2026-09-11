import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { describe, expect, it } from 'vitest';
import { useTuningStore } from '@/entities/Tuning/model/tuning.store';
import { MAX_FRETS_COUNT, MAX_STRINGS_COUNT, MIN_FRETS_COUNT, MIN_STRINGS_COUNT } from '@/widgets/GuitarNeck/consts';
import { useNeckStore } from '@/widgets/GuitarNeck/model/guitarNeck.store';
import NeckSizeChanger from './NeckSizeChanger.vue';

const ElFormItemStub = {
  template: '<div><slot /></div>',
};

const ElInputNumberStub = {
  props: ['modelValue', 'min', 'max', 'size', 'ariaLabel'],
  emits: ['change'],
  template: `<input
    class="el-input-number"
    :value="modelValue"
    :data-min="min"
    :data-max="max"
    :aria-label="ariaLabel" />`,
};

function mountNeckSizeChanger() {
  const pinia = createPinia();

  setActivePinia(pinia);

  const neckStore = useNeckStore();
  const tuningStore = useTuningStore();
  const wrapper = mount(NeckSizeChanger, {
    global: {
      plugins: [pinia],
      stubs: {
        ElFormItem: ElFormItemStub,
        ElInputNumber: ElInputNumberStub,
      },
    },
  });

  return { neckStore, tuningStore, wrapper };
}

describe('NeckSizeChanger', () => {
  it('показывает текущее число струн и ладов с границами', () => {
    const { wrapper } = mountNeckSizeChanger();
    const inputs = wrapper.findAll('.el-input-number');

    expect(inputs).toHaveLength(2);
    expect(inputs[0].attributes('data-min')).toBe(String(MIN_STRINGS_COUNT));
    expect(inputs[0].attributes('data-max')).toBe(String(MAX_STRINGS_COUNT));
    expect(inputs[1].attributes('data-min')).toBe(String(MIN_FRETS_COUNT));
    expect(inputs[1].attributes('data-max')).toBe(String(MAX_FRETS_COUNT));
  });

  it('меняет число струн, не трогая строй', async () => {
    const { neckStore, tuningStore, wrapper } = mountNeckSizeChanger();

    wrapper.findAllComponents(ElInputNumberStub)[0].vm.$emit('change', 4);
    await nextTick();

    expect(neckStore.stringsCount).toBe(4);
    expect(neckStore.stringNotes).toHaveLength(4);
    expect(tuningStore.notes).toHaveLength(6);
  });

  it('меняет число ладов', async () => {
    const { neckStore, wrapper } = mountNeckSizeChanger();

    wrapper.findAllComponents(ElInputNumberStub)[1].vm.$emit('change', 20);
    await nextTick();

    expect(neckStore.fretsCount).toBe(20);
  });

  it('зажимает выход за границы из контрола', async () => {
    const { neckStore, wrapper } = mountNeckSizeChanger();
    const [stringsInput, fretsInput] = wrapper.findAllComponents(ElInputNumberStub);

    stringsInput.vm.$emit('change', 999);
    fretsInput.vm.$emit('change', -1);
    await nextTick();

    expect(neckStore.stringsCount).toBe(MAX_STRINGS_COUNT);
    expect(neckStore.fretsCount).toBe(MIN_FRETS_COUNT);
  });

  it('игнорирует пустое значение из контрола', async () => {
    const { neckStore, wrapper } = mountNeckSizeChanger();

    wrapper.findAllComponents(ElInputNumberStub)[0].vm.$emit('change', undefined);
    await nextTick();

    expect(neckStore.stringsCount).toBe(6);
  });
});

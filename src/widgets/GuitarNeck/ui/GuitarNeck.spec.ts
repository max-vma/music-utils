import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { GUITAR_DROP_D } from '@/entities/Tuning/consts';
import { useTuningStore } from '@/entities/Tuning/model/tuning.store';
import { useNeckStore } from '@/widgets/GuitarNeck/model/guitarNeck.store';
import GuitarNeck from './GuitarNeck.vue';
import GuitarNeckFret from './GuitarNeckFret.vue';
import GuitarNeckString from './GuitarNeckString.vue';

function mountGuitarNeck() {
  const pinia = createPinia();

  setActivePinia(pinia);

  const neckStore = useNeckStore();
  const tuningStore = useTuningStore();
  const wrapper = mount(GuitarNeck, { global: { plugins: [pinia] } });

  return { neckStore, tuningStore, wrapper };
}

describe('GuitarNeck', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('рендерит по дорожке на каждую струну и число ладов + порожек', () => {
    const { wrapper } = mountGuitarNeck();

    expect(wrapper.findAllComponents(GuitarNeckString)).toHaveLength(6);
    expect(wrapper.findComponent(GuitarNeckString).findAllComponents(GuitarNeckFret)).toHaveLength(13);
  });

  it('реактивно перестраивает гриф при уменьшении числа струн', async () => {
    const { neckStore, wrapper } = mountGuitarNeck();

    neckStore.setStringsCount(4);
    await nextTick();

    expect(wrapper.findAllComponents(GuitarNeckString)).toHaveLength(4);
  });

  it('достраивает гриф при увеличении числа струн', async () => {
    const { neckStore, wrapper } = mountGuitarNeck();

    neckStore.setStringsCount(8);
    await nextTick();

    expect(wrapper.findAllComponents(GuitarNeckString)).toHaveLength(8);
  });

  it('реактивно перестраивает гриф при увеличении числа ладов', async () => {
    const { neckStore, wrapper } = mountGuitarNeck();

    neckStore.setFretsCount(24);
    await nextTick();

    expect(wrapper.findComponent(GuitarNeckString).findAllComponents(GuitarNeckFret)).toHaveLength(25);
  });

  it('не меняет число струн при смене строя', async () => {
    const { neckStore, tuningStore, wrapper } = mountGuitarNeck();

    neckStore.setStringsCount(4);
    tuningStore.setTuning(GUITAR_DROP_D);
    await nextTick();

    expect(tuningStore.notes).toHaveLength(6);
    expect(wrapper.findAllComponents(GuitarNeckString)).toHaveLength(4);
  });
});

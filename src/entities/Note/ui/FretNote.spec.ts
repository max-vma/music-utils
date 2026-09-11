import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { NoteNames, OctaveNames } from '@/entities/Note/consts';
import { Note } from '@/entities/Note/model';
import FretNote from './FretNote.vue';

const createNote = () => new Note(NoteNames.E, OctaveNames.Two);

describe('FretNote', () => {
  it('показывает название ноты и октаву', () => {
    const wrapper = mount(FretNote, { props: { note: createNote() } });

    expect(wrapper.text()).toContain('E2');
  });

  it('использует переданное музыкальное имя ноты', () => {
    const wrapper = mount(FretNote, { props: { note: createNote(), displayName: 'Fb2' } });

    expect(wrapper.text()).toContain('Fb2');
  });

  it('на нулевом ладу показывает доступные кнопки настройки струны', () => {
    const wrapper = mount(FretNote, {
      props: { note: createNote(), isZeroFret: true },
    });

    const prev = wrapper.find('button[aria-label^="Понизить"]');
    const next = wrapper.find('button[aria-label^="Повысить"]');

    expect(prev.exists()).toBe(true);
    expect(next.exists()).toBe(true);
    expect(prev.attributes('type')).toBe('button');
  });

  it('эмитит события prev/next по клику на кнопки', async () => {
    const wrapper = mount(FretNote, {
      props: { note: createNote(), isZeroFret: true },
    });

    await wrapper.find('button[aria-label^="Понизить"]').trigger('click');
    await wrapper.find('button[aria-label^="Повысить"]').trigger('click');

    expect(wrapper.emitted('prev')).toHaveLength(1);
    expect(wrapper.emitted('next')).toHaveLength(1);
  });

  it('не рендерит кнопки настройки вне нулевого лада', () => {
    const wrapper = mount(FretNote, { props: { note: createNote() } });

    expect(wrapper.findAll('button')).toHaveLength(0);
  });

  it('не рендерит скрытую ноту вне нулевого лада', () => {
    const wrapper = mount(FretNote, {
      props: { note: createNote(), isHidden: true },
    });

    expect(wrapper.find('div').exists()).toBe(false);
  });
});

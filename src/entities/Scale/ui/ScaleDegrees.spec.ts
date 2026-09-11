import { render, screen, waitFor } from '@testing-library/vue';
import { createPinia, setActivePinia } from 'pinia';
import { describe, expect, it } from 'vitest';
import { NoteNames } from '@/entities/Note/consts';
import { ScaleNames } from '@/entities/Scale/consts';
import { useScaleStore } from '@/entities/Scale/model/scale.store';
import ScaleDegrees from './ScaleDegrees.vue';

function renderScaleDegrees(tonic: NoteNames, type: ScaleNames) {
  const pinia = createPinia();
  setActivePinia(pinia);

  const store = useScaleStore();
  store.setTonic(tonic);
  store.setType(type);

  const view = render(ScaleDegrees, { global: { plugins: [pinia] } });

  return { store, ...view };
}

describe('ScaleDegrees', () => {
  it('показывает ступени и ноты натурального мажора', () => {
    renderScaleDegrees(NoteNames.C, ScaleNames.NaturalMajor);

    expect(screen.getByLabelText('C: ступень I')).toBeInTheDocument();
    expect(screen.getByLabelText('D: ступень II')).toBeInTheDocument();
    expect(screen.getByLabelText('B: ступень VII')).toBeInTheDocument();
  });

  it('подписывает интервалы между ступенями', () => {
    renderScaleDegrees(NoteNames.C, ScaleNames.NaturalMajor);

    expect(screen.getAllByText('м.2').length).toBeGreaterThan(0);
    expect(screen.getAllByText('б.2').length).toBeGreaterThan(0);
  });

  it('пересчитывает ступени при смене гаммы', async () => {
    const { store } = renderScaleDegrees(NoteNames.C, ScaleNames.NaturalMajor);

    expect(screen.queryByLabelText('D#: ступень bIII')).not.toBeInTheDocument();

    store.setType(ScaleNames.BluesMinor);

    await waitFor(() => {
      expect(screen.getByLabelText('D#: ступень bIII')).toBeInTheDocument();
    });
    expect(screen.getByLabelText('A#: ступень bVII')).toBeInTheDocument();
  });
});

import { NoteNames, OctaveNames } from '@/entities/Note/consts';
import { Note } from '@/entities/Note/model/Note';
import { getScaleStep, ScaleStep } from '@/entities/Scale/model/scaleDegree';

export class ScaleNote extends Note {
  private _step = 0;
  private _semitonesFromTonic = 0;

  constructor(note: NoteNames | Note, step: number, octave?: OctaveNames, semitonesFromTonic = 0) {
    super(note instanceof Note ? note.note : note, note instanceof Note ? note.octave : octave);
    this.step = step;
    this.semitonesFromTonic = semitonesFromTonic;
  }

  public set step(step: number) {
    this._step = step;
  }

  public get step(): number {
    return this._step;
  }

  public set semitonesFromTonic(semitonesFromTonic: number) {
    this._semitonesFromTonic = semitonesFromTonic;
  }

  public get semitonesFromTonic(): number {
    return this._semitonesFromTonic;
  }

  public get degree(): ScaleStep {
    return getScaleStep(this._semitonesFromTonic);
  }

  public get degreeLabel(): string {
    return this.degree.label;
  }
}

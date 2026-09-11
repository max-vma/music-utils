import { NoteNames, OctaveNames } from '@/entities/Note/consts';
import { Note } from '@/entities/Note/model/Note';

export class ScaleNote extends Note {
  private _step = 0;

  constructor(note: NoteNames | Note, step: number, octave?: OctaveNames) {
    super(note instanceof Note ? note.note : note, note instanceof Note ? note.octave : octave);
    this.step = step;
  }

  public set step(step: number) {
    this._step = step;
  }

  public get step(): number {
    return this._step;
  }
}

import { Note, NoteCollection, NoteNames } from '@/entities/Note';
import { MAX_NOTES_COUNT } from '@/entities/Note/consts';
import { ScaleNames, Scales } from '@/entities/Scale/consts';
import { ScaleNote } from '@/entities/Scale/model/ScaleNote';

interface MusicalScaleCreateConfig {
  from?: Note;
  to?: Note;
  type?: ScaleNames;
}

export class MusicalScale extends NoteCollection {
  private _tonic: Note = new Note(NoteNames.C);
  private _type: ScaleNames = ScaleNames.NaturalMinor;

  constructor(tonic?: NoteNames | null, createConfig?: MusicalScaleCreateConfig) {
    super();
    if (createConfig?.type !== undefined) this._type = createConfig.type;
    if (tonic) this._tonic = new Note(tonic);

    if (createConfig?.from && createConfig?.to) {
      this._tonic = new Note(createConfig.from.note, createConfig.from.octave);
      this.createRange(createConfig.from, createConfig.to);
    } else {
      this.createScale();
    }
  }

  private createScale(): void {
    const steps = Scales[this._type];

    this.push(new ScaleNote(this.tonic, 0));

    const currentNote = new Note(this.tonic.note);

    steps.forEach((step, index) => {
      currentNote.upOnSemitones(step);
      this.push(new ScaleNote(currentNote, index + 1));
    });
  }

  private createRange(from: Note, to: Note): void {
    const onlyNote = to.octave === undefined;
    const maxIterations = MAX_NOTES_COUNT * 10;
    let current: Note = new Note(from.note, from.octave);

    for (let index = 0; index < maxIterations; index++) {
      this.push(new ScaleNote(current, index));

      if (current.is(to, onlyNote)) return;

      current = current.getNextSemitoneNote();
    }
  }

  public getStepIndex(note: Note | NoteNames): number {
    return this.notes.findIndex(n => n.note === this.getNote(note).note);
  }

  public set type(scale: ScaleNames) {
    this._type = scale;
  }

  public get type(): ScaleNames {
    return this._type;
  }

  public set tonic(tonic: Note) {
    this._tonic = tonic;
  }

  public get tonic(): Note {
    return this._tonic;
  }
}

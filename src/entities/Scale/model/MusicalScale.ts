import { Note, NoteCollection, NoteNames } from '@/entities/Note';
import { MAX_NOTES_COUNT } from '@/entities/Note/consts';
import { ScaleNames, Scales } from '@/entities/Scale/consts';
import { ScaleNote } from '@/entities/Scale/model/ScaleNote';
import { getContextualNoteName } from '@/entities/Scale/model/noteSpelling';
import { getScaleInterval, getScaleStep, ScaleInterval, ScaleStep } from '@/entities/Scale/model/scaleDegree';

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

    this.push(new ScaleNote(this.tonic, 0, undefined, 0));

    const currentNote = new Note(this.tonic.note);
    let semitonesFromTonic = 0;

    steps.forEach((step, index) => {
      currentNote.upOnSemitones(step);
      semitonesFromTonic += step;
      this.push(new ScaleNote(currentNote, index + 1, undefined, semitonesFromTonic));
    });
  }

  private createRange(from: Note, to: Note): void {
    const onlyNote = to.octave === undefined;
    const maxIterations = MAX_NOTES_COUNT * 10;
    let current: Note = new Note(from.note, from.octave);
    let semitonesFromTonic = 0;

    for (let index = 0; index < maxIterations; index++) {
      this.push(new ScaleNote(current, index, undefined, semitonesFromTonic));

      if (current.is(to, onlyNote)) return;

      current = current.getNextSemitoneNote();
      semitonesFromTonic += 1;
    }
  }

  public get degrees(): ScaleStep[] {
    return this.notes.map(note => (note instanceof ScaleNote ? note.degree : getScaleStep(0)));
  }

  public get degreeLabels(): string[] {
    return this.degrees.map(degree => degree.label);
  }

  /** Имя ноты, записанное музыкально корректно относительно тоники. */
  public getDisplayName(note: Note | NoteNames): string {
    const noteNumber = note instanceof Note ? note.note : note;
    const semitonesFromTonic =
      (((noteNumber - this._tonic.note) % MAX_NOTES_COUNT) + MAX_NOTES_COUNT) % MAX_NOTES_COUNT;

    return getContextualNoteName(this._tonic.note, semitonesFromTonic);
  }

  /** Имена всех нот гаммы, записанные музыкально корректно относительно тоники. */
  public getDisplayNames(): string[] {
    return this.notes.map(note => this.getDisplayName(note));
  }

  public get intervals(): ScaleInterval[] {
    return this.notes.slice(1).map((note, index) => {
      const previous = this.notes[index];
      const from = previous instanceof ScaleNote ? previous.semitonesFromTonic : 0;
      const to = note instanceof ScaleNote ? note.semitonesFromTonic : 0;

      return getScaleInterval(from, to);
    });
  }

  public get intervalLabels(): string[] {
    return this.intervals.map(interval => interval.label);
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

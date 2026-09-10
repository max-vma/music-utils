import { Note, NoteCollection, NoteNames } from '@/entities/Note';
import { Scales, ScaleNames } from '@/entities/Scale/consts';
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
    if (createConfig?.type) this._type = createConfig.type;
    if (tonic) this._tonic = new Note(tonic);

    this.createScale(createConfig);
  }

  private createScale(config?: MusicalScaleCreateConfig) {
    if (config && config.type !== undefined) {
      const steps = Scales[config.type];
      this.push(this.tonic);
      const currentNote = new Note(this.tonic.note);

      steps.forEach((s: number, index) => {
        const uppedNote = currentNote.upOnSemitones(s);
        this.push(new ScaleNote(uppedNote, index + 1));
      });
    }

    if (config && config.from && config.to) {
      const { from, to } = config;
      this.push(from);
      const currentNote = from;

      for (let index = from.note; index < to.note; index++) {
        const uppedNote = currentNote.upOnSemitones(1);
        this.push(uppedNote);
      }
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

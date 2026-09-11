import { MAX_NOTES_COUNT, NoteNames, NOTES_LAST_INDEX, OctaveNames } from '@/entities/Note/consts';

export class Note {
  private _note: NoteNames = NoteNames.C;
  private _octave?: OctaveNames;
  public noteName = '';
  public indexInCollection: number = -1;

  constructor(note: NoteNames, octave?: OctaveNames, indexInCollection?: number) {
    this.note = note;
    this.octave = octave;
    if (indexInCollection !== undefined) this.indexInCollection = indexInCollection;
  }

  public set note(note: NoteNames) {
    this._note = note;
    this.noteName = this.getNoteName();
  }

  public get note(): NoteNames {
    return this._note;
  }

  public set octave(octave: OctaveNames | undefined) {
    this._octave = octave;
    this.noteName = this.getNoteName();
  }

  public get octave(): OctaveNames | undefined {
    return this._octave;
  }

  public is(note: Note | NoteNames, onlyNote: boolean = true): boolean {
    const gettedNote = this.getNote(note);
    const isEqualNotes = gettedNote.note === this.note;

    if (onlyNote) return isEqualNotes;
    return isEqualNotes && gettedNote.octave === this.octave;
  }

  protected getNote(note: Note | NoteNames): Note {
    return note instanceof Note ? note : new Note(note);
  }

  public upOnSemitones(semiTones: number): Note {
    const absoluteIndex = (this.note as number) + semiTones;
    const octaveShift = Math.floor(absoluteIndex / MAX_NOTES_COUNT);
    const noteIndex = ((absoluteIndex % MAX_NOTES_COUNT) + MAX_NOTES_COUNT) % MAX_NOTES_COUNT;

    this.note = noteIndex as NoteNames;
    if (this._octave !== undefined && octaveShift !== 0) {
      this.octave = (this._octave + octaveShift) as OctaveNames;
    }

    return this;
  }

  public getNoteName(noteNumber: NoteNames = this.note, octave?: OctaveNames): string {
    return `${NoteNames[noteNumber]}${octave ?? ''}`;
  }

  public getNextSemitoneNote(): Note {
    return this.getOtherNote(true);
  }

  public getOtherNote(isNext: boolean): Note {
    const nextNoteIndex = (this.note as number) + (isNext ? 1 : -1);
    let currentNote: NoteNames;
    let currentOctave = this._octave;

    if (nextNoteIndex > NOTES_LAST_INDEX) {
      currentNote = NoteNames.C;
      if (currentOctave !== undefined) currentOctave = (currentOctave + 1) as OctaveNames;
    } else if (nextNoteIndex < 0) {
      currentNote = NoteNames.B;
      if (currentOctave !== undefined) currentOctave = (currentOctave - 1) as OctaveNames;
    } else {
      currentNote = nextNoteIndex as NoteNames;
    }

    const newNote = new Note(currentNote, currentOctave);
    newNote.indexInCollection = this.indexInCollection;
    return newNote;
  }

  public getPrevSemitoneNote(): Note {
    return this.getOtherNote(false);
  }
}

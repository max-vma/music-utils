import { NoteNames, NOTES_LAST_INDEX, OctaveNames } from '@/entities';

export class Note {
  private _note: NoteNames = NoteNames.C;
  private _octave?: OctaveNames;
  public noteName = '';
  public indexInCollection: number = -1;

  constructor(note: NoteNames, octave?: OctaveNames, indexInCollection?: number) {
    this.note = note;
    this.octave = octave;
    if (indexInCollection) this.indexInCollection = indexInCollection;
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

  public is(note: Note | NoteNames, onlyNote: boolean = true) {
    const gettedNote = this.getNote(note);
    const isEqualNotes = gettedNote.note === this.note;
    const isEqualOctaves = gettedNote.octave === this.octave;

    return onlyNote ? isEqualNotes : isEqualNotes && isEqualOctaves;
  }

  protected getNote(note: Note | NoteNames): Note {
    return note instanceof Note ? note : new Note(note);
  }

  public upOnSemitones(semiTones: number): Note {
    let currentNoteIndex: number = (this.note as number) + semiTones;
    if (currentNoteIndex > NOTES_LAST_INDEX) currentNoteIndex = currentNoteIndex - NOTES_LAST_INDEX - 1;

    const a = NoteNames[currentNoteIndex];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.note = NoteNames[a];
    return this;
  }

  public getNoteName(noteNumber: number = this.note, octave?: OctaveNames): string {
    const noteNames = Object.keys(NoteNames).filter(key => isNaN(Number(key))) as Array<keyof typeof NoteNames>;
    const noteName = noteNames.find(name => NoteNames[name] === noteNumber);
    return `${noteName}${octave ? octave : ''}`;
  }

  public getNextSemitoneNote(): Note {
    return this.getOtherNote(true);
  }
  public getOtherNote(isNext: boolean) {
    let currentNote = this.note;
    let currentOctave = this.octave;
    const nextNoteIndex = currentNote + (isNext ? 1 : -1);
    if (nextNoteIndex > NOTES_LAST_INDEX) {
      currentNote = NoteNames.C;
      if (currentOctave) currentOctave++;
    } else if (nextNoteIndex < 0) {
      currentNote = NoteNames.B;
      if (currentOctave) currentOctave--;
    } else {
      currentNote = nextNoteIndex;
    }
    const newNote = new Note(currentNote, currentOctave);
    newNote.indexInCollection = this.indexInCollection;
    return newNote;
  }
  public getPrevSemitoneNote(): Note {
    return this.getOtherNote(false);
  }
}

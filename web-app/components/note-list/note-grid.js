import NoteCard from "../note-card";


export default function NoteGrid({ notes }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {notes.sort((a, b) => b.updated_at - a.updated_at).map((note) => (
        <NoteCard note={note} />
      ))}
    </div>
  );
}

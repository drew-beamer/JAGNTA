import { getNotes } from "@/lib/utils/api/notes";

export default async function ListOfNotes() {
  const notes = await getNotes();


  return notes[0].map((note) => (
    <div>
      <h2>{note.title}</h2>
    </div>
  ));
}

import { getNotes } from "@/lib/utils/api/notes";
import { Link } from "@nextui-org/react";

export default async function ListOfNotes() {
  const notes = await getNotes();

  return notes[0].map((note) => (
    <div>
      <Link color="foreground" href={`/note/${note.id}`}>
        {note.title}
      </Link>
    </div>
  ));
}

import { getNotes } from "@/lib/utils/api/notes";
import { Link } from "@nextui-org/react";
import NoteGrid from "./note-grid";

export default async function ListOfNotes() {
  const notes = (await getNotes())[0];

  return (
    <section className="mb-16">
      <NoteGrid notes={notes} />
    </section>
  );
}

/*
      <Link color="foreground" href={`/note/${note.id}`}>
        {note.title}
      </Link>
*/

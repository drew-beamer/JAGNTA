import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Link from "next/link";

function NoteCard({ note }) {
  return (
    <Card>
      <CardHeader>
        <Link className="no-underline hover:underline" target="_blank" href={`/note/${note.id}`}>
          <h4 className="m-0">{note.title}</h4>
        </Link>
      </CardHeader>
      <CardBody>
        <small>{note.content.slice(0, 20).trim()}...</small>
      </CardBody>
    </Card>
  );
}

export default function NoteGrid({ notes }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

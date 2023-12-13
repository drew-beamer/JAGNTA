import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Link from "next/link";
import { TrashIcon } from "../ui/icons";
import Button from "../ui/button";

function NoteCard({ note }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-start justify-stretch w-full">
          <Link
            className="no-underline hover:underline grow w-full"
            target="_blank"
            href={`/note/${note.id}`}>
            <h4 className="m-0 p-0 leading-tight">{note.title}</h4>
          </Link>
          <Button className="py-[0.125rem] ml-2">
            <TrashIcon width={16} height={16} className="fill-neutral-400" />
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <small className="text-neutral-300 line-clamp-3">{note.content.slice(0, 100).trim()}...</small>
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

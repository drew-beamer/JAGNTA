"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Link from "next/link";
import { TrashIcon } from "../ui/icons";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

export default function NoteCard({ note }) {
  const router = useRouter();

  const handleDelete = async () => {
    await fetch("/api/note", {
      method: "DELETE",
      body: JSON.stringify({ id: note.id }),
    }).then(() => router.refresh());
  };

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
          <Button onClick={handleDelete} className="py-[0.125rem] ml-2">
            <TrashIcon width={16} height={16} className="fill-neutral-400" />
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <small className="text-neutral-300 line-clamp-3">
          {note.content.slice(0, 100).trim()}...
        </small>
      </CardBody>
    </Card>
  );
}

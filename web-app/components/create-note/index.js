"use client";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function CreateNote() {
  const router = useRouter();

  const handleClickEvent = async () => {
    fetch("/api/note", { method: "POST" }).then(async (res) => {
      const { message, id } = await res.json();
      if (message === "success") {
        router.push(`/note/${id}`);
      }
    });

  };

  return <Button onClick={handleClickEvent}>Create Note</Button>;
}

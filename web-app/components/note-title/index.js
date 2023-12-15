"use client";

import { useEffect } from "react";

export default function NoteTitle({ id, defaultTitle }) {
  useEffect(() => {
    const inputListener = addEventListener("input", (event) => {
      if (event.target.id === "note-title") {
        fetch("/api/save", {
          method: "POST",
          body: JSON.stringify({
            title: event.target.innerHTML,
            id,
          }),
        });
      }
    });

    return () => {
      removeEventListener("input", inputListener);
    };
  }, [id]);

  return (
    <h1
      contentEditable="plaintext-only"
      suppressContentEditableWarning
      name="content"
      id="note-title"
      className="border-none outline-none"
      dangerouslySetInnerHTML={{ __html: defaultTitle }}></h1>
  );
}

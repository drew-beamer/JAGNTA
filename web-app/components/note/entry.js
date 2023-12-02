"use client";

import { useEffect } from "react";

export default function NoteEntry({ defaultContent, id }) {
  useEffect(() => {
    const inputListener = addEventListener("input", (event) => {
      fetch("/api/save", {
        method: "POST",
        body: JSON.stringify({
          content: event.target.innerHTML,
          id,
        }),
      });
    });

    return () => {
      removeEventListener("input", inputListener);
    };
  }, []);

  return (
    <div
      contentEditable
      suppressContentEditableWarning
      className="w-full min-h-[18px] inline-block overflow-auto dark:bg-neutral-950 text-white outline-none border-none active:outline-none active:border-none"
      name="content"
      dangerouslySetInnerHTML={{__html: defaultContent}}
      >
    </div>
  );
}

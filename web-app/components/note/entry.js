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

  /**
   * @todo figure out a way to sanitize the input coming in. currently vulnerable to potential
   * XSS attack, which is a bit out of the scope of the project for the sake of the class, but
   * if we ever wanted to do anything with this after that is *not good* 
  */
  return (
    <p
      contentEditable
      suppressContentEditableWarning
      className="w-full min-h-[18px] inline-block overflow-auto"
      name="content"
      dangerouslySetInnerHTML={{__html: defaultContent}}
      >
    </p>
  );
}

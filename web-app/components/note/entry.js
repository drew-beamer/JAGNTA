"use client";

import { useEffect } from "react";
import { getUniqueNonStopwords } from "@/lib/utils/nlp/stopword";

export default function NoteEntry({ defaultContent, id }) {
  useEffect(() => {
    const inputListener = addEventListener("input", (event) => {
      if (event.target.id === "note-entry") {
        const uniqueNonStopwords = getUniqueNonStopwords(event.target.innerHTML);

        fetch("/api/save", {
          method: "POST",
          body: JSON.stringify({
            content: event.target.innerHTML,
            uniqueNonStopwords,
            id,
          }),
        });
      }
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
      id="note-entry"
      contentEditable="plaintext-only"
      suppressContentEditableWarning
      className="w-full min-h-[18px] inline-block overflow-auto outline-none border-none"
      name="content"
      dangerouslySetInnerHTML={{ __html: defaultContent }}></p>
  );
}

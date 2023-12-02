import { getNotes } from "@/lib/utils/api/notes";
import { getNote } from "@/lib/utils/api/note";
import Note from "@/components/note";

export async function generateStaticParams() {
  const notes = await getNotes();

  const routes = notes.map((note) => ({
    slug: note.id,
  }));

  return routes;
}

export default async function NotePage({ params }) {
  const { slug } = params;
  const note = await getNote(slug);
  return (
    <main className="mx-auto w-full max-w-xl mt-8">
      <h1>NOTE {slug}</h1>
      <section>
        <Note id={slug} defaultContent={note.content} />
      </section>
    </main>
  );
}

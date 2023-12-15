import { getNotes } from "@/lib/utils/api/notes";
import { getNote } from "@/lib/utils/api/note";
import Note from "@/components/note";
import NoteTitle from "@/components/note-title";

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
      <NoteTitle id={slug} defaultTitle={note.title} />
      <section>
        <Note id={slug} defaultContent={note.content} />
      </section>
    </main>
  );
}
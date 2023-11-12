import { getNotes } from "@/lib/utils/api/notes";
import { getNote } from "@/lib/utils/api/note";
import NoteTaking from "@/components/NoteTaking";

export async function generateStaticParams() {
  const notes = await getNotes();

  const routes = notes.map((note) => ({
    slug: note.id
  }));

  console.log(routes)

  return routes
}

export default async function NotePage({ params }) {
  const { slug } = params;
  const note = await getNote(slug);
  return (
    <div>
      <h1>NOTE {slug}</h1>
      <NoteTaking id={slug} defaultContent={note.content} />
    </div>
  );
}

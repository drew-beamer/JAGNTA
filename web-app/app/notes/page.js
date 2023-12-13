import ListOfNotes from "@/components/note-list";
import CreateNote from "@/components/create-note";

export default function NotesPage() {
  return (
    <main className="mx-auto w-full max-w-xl mt-8">
      <div className="flex items-center mb-8">
        <h1 className="grow m-0 p-0">My Notes</h1>
        <CreateNote />
      </div>
      <ListOfNotes />
    </main>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
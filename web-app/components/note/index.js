import NoteEntry from "./entry";

export default function Note({ id, defaultContent }) {

  return <NoteEntry id={id} defaultContent={defaultContent} />;
}

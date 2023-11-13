import connection from "@/lib/db";
import { revalidatePath } from "next/cache";

export default function NoteTaking({ id, defaultContent }) {
  /**
   * @param {FormData} formData
   */
  async function handleSubmit(formData) {
    // YEAH NEW FEATURES
    "use server";
    const name = formData.get("content");

    await (await connection).query("UPDATE Notes SET content = ? WHERE id = ?;", [name, id]);
    revalidatePath('/');
  }

  return (
    <form action={handleSubmit}>
      <textarea defaultValue={defaultContent} name="content" />
      <button type="submit">Save</button>
    </form>
  );
}

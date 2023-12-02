import connection from "@/lib/db";
import { getUniqueNonStopwords } from "@/lib/utils/nlp/stopword";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param { NextRequest } req
 */
export async function POST(req) {
  const { content, id } = await req.json();

  const uniqueNonStopwords = getUniqueNonStopwords(content);

  const loadedConnection = await connection;

  await loadedConnection.query("START TRANSACTION");
  await loadedConnection.query("DELETE FROM NotesIndex WHERE id = ?", [id]);

  uniqueNonStopwords.forEach(
    async (stopword) =>
      await loadedConnection.query("INSERT IGNORE INTO NotesIndex VALUES (?, ?)", [
        id,
        stopword,
      ])
  )
  await (
    await connection
    ).query("UPDATE Notes SET content = ? WHERE id = ?;", [content, id]);
  await loadedConnection.query("COMMIT");
  return NextResponse.json({ message: "success" });
}

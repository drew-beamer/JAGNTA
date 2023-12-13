import connection from "@/lib/db";
import { getUniqueNonStopwords } from "@/lib/utils/nlp/stopword";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param { NextRequest } req
 */
export async function POST(req) {
  const { title, content, id, uniqueNonStopwords } = await req.json();
  const loadedConnection = await connection;

  if (content) {
  
    await loadedConnection.beginTransaction();
    await loadedConnection.query("DELETE FROM NotesIndex WHERE id = ?", [id]);
  
    for (const { word, index } of uniqueNonStopwords) {
      await loadedConnection.query(
        "INSERT IGNORE INTO NotesIndex VALUES (?, ?, ?)",
        [id, word, index]
      );
    }
    await (
      await connection
    ).query("UPDATE Notes SET content = ? WHERE id = ?;", [content, id]);
    await loadedConnection.commit();
  } else if (title) {
    await loadedConnection.beginTransaction();
    await loadedConnection.query("UPDATE Notes SET title = ? WHERE id = ?;", [title, id]);
    await loadedConnection.commit();
  }
  return NextResponse.json({ message: "success" });
}

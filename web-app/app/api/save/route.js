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
    await loadedConnection.query("DELETE FROM Occurences WHERE note_id = ?", [id]);
  
    for (const { word, index } of uniqueNonStopwords) {
      await loadedConnection.query(
        "INSERT IGNORE INTO Occurences VALUES (?, ?, ?)",
        [id, word, index]
      );
    }
    await loadedConnection.query("UPDATE Notes SET content = ?,updated_at = ? WHERE note_id = ?;", [content, new Date(), id]);
    await loadedConnection.commit();
  } else if (title) {
    await loadedConnection.beginTransaction();
    await loadedConnection.query("UPDATE Notes SET title = ? WHERE note_id = ?;", [title, id]);
    await loadedConnection.commit();
  }
  return NextResponse.json({ message: "success" });
}

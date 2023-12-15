import connection from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 *
 * @returns
 */
export async function POST() {
  const loadedConnection = await connection;

  await loadedConnection.beginTransaction();
  await loadedConnection.query(
    "INSERT INTO Notes (title, content) VALUES (?, ?)",
    ["Untitled Note", ""]
  );

  const id = await loadedConnection.query("SELECT LAST_INSERT_ID()");
  await loadedConnection.commit();

  return NextResponse.json({
    message: "success",
    id: id[0][0]["LAST_INSERT_ID()"],
  });
}

/**
 * 
 * @param {NextRequest} req 
 */
export async function DELETE(req) {
  const { id } = await req.json();

  const loadedConnection = await connection;
  await loadedConnection.beginTransaction();
  await loadedConnection.query("DELETE FROM Notes WHERE id = ?", [id]);
  await loadedConnection.commit();

  return NextResponse.json({message: "success"});
}

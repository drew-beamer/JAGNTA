import connection from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param { NextRequest } req
 */
export async function POST(req) {
  const { content, id } = await req.json();
  await (
    await connection
  ).query("UPDATE Notes SET content = ? WHERE id = ?;", [content, id]);
  return NextResponse.json({ message: "success" });
}

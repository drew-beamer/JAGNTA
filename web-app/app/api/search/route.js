import { NextRequest, NextResponse } from "next/server";
import connection from "@/lib/db";

function expandQuery(currentQuery, operation) {
  return `(${currentQuery} ${
    operation === "OR" ? "UNION" : operation === "AND" ? "INTERSECT" : "EXCEPT"
  } SELECT note_id FROM Occurences WHERE word = ?)`;
}

function joinQuery(filteredNoteTableQuery) {
  return `SELECT note_id, word, title, content, main_count FROM Notes JOIN (SELECT note_id, word, count(note_id) as main_count FROM Occurences WHERE note_id IN ${filteredNoteTableQuery} AND word = ? GROUP BY note_id) as doc_counts USING(note_id) ORDER BY main_count DESC`;
}

/**
 *
 * @param {NextRequest} req
 */
export async function GET(req) {
  const params = req.nextUrl.searchParams;
  const paramArray = Array.from(params.entries());
  if (paramArray.length % 2 !== 1) {
    return NextResponse.error();
  }
  // Main thing to search--rest define articles to include/not include
  /*
    'Pizza' - gets articles mentioning pizza
    'Pizza and pepperoni' gets articles mentioning pizza and pepperoni
    'Pizza and pepperoni not cheese' gets articles mentioning pizza and pepperoni, but not cheese
    Essentially l -> r evaluation with no parentheses
    'Pizza not cheese and pepperoni' has the same evaluation as the former
    */
  const main = params.get("main");
  const loadedConnection = await connection;
  const baseQuery = `(SELECT note_id FROM Occurences WHERE word = ?)`;
  const queryParams = [main];
  let currentQuery = baseQuery;
  for (let i = 0; i < Math.floor(paramArray.length / 2); i++) {
    const operator = params.get(`entry${i}-select`);
    const word = params.get(`entry${i}-search`);
    currentQuery = expandQuery(currentQuery, operator);
    queryParams.push(word);
  }
  currentQuery = joinQuery(currentQuery);
  queryParams.push(main);
  const res = (await loadedConnection.query(currentQuery, queryParams))[0];

  return NextResponse.json(res);
}

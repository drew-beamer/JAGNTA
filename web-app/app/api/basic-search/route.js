import connection from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

function expandQuery(currentQ){
    return currentQ + ' OR ' + "word= ?"
}

/**
 * 
 * @param {NextRequest} req 
 * @returns 
 */
export async function GET (req) {
    const loadedConnection = await connection;
    const params = req.nextUrl.searchParams;
    const words = params.get("search").split(" ");
    let query = '(SELECT id, count(id) as words_count FROM NotesIndex WHERE word = ?'
    words.slice(1).forEach(() => {
        query = expandQuery(query);
    })
    query += " GROUP BY id) as count_table "
    const joinedQuery = 'SELECT id, title, content, words_count FROM Notes JOIN ' + query + ' USING(id) ORDER BY words_count DESC'

    const response = (await loadedConnection.query(joinedQuery, words))[0];
    return NextResponse.json(response);
}

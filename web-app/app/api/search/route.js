import { NextRequest, NextResponse } from "next/server";
import connection from '@/lib/db'

/**
 * 
 * @param {NextRequest} req 
 */
export async function GET(req) {
    const params = req.nextUrl.searchParams;
    console.log(params);
    // Main thing to search--rest define articles to include/not include
    /*
    'Pizza' - gets articles mentioning pizza
    'Pizza and pepperoni' gets articles mentioning pizza and pepperoni
    'Pizza and pepperoni not cheese' gets articles mentioning pizza and pepperoni, but not cheese
    Essentially l -> r evaluation with no parentheses
    'Pizza not cheese and pepperoni' has the same evaluation as the former
    */
    const main = params.get('main');
    console.log(params)
    const loadedConnection = await connection;
    const mainDocuments = await loadedConnection.query("SELECT id, COUNT(id) FROM NotesIndex WHERE word = ? GROUP BY id", [main]);
    console.log(mainDocuments)
    return NextResponse.json({message: "success!"})

}
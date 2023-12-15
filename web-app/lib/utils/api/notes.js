import connection from '@/lib/db'

export async function getNotes() {
    const notes = await (await connection).query("SELECT * FROM Notes");
    return notes;
}
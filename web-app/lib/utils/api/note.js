import connection from '@/lib/db'

/**
 * @param {number} id
 */
export async function getNote(id) {
    const note = await (await connection).query("SELECT * FROM Notes WHERE note_id = ?", id);
    return note[0][0];
}

export async function updateNote(id) {
    
}
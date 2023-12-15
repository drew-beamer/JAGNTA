/**
 * @fileoverview Contains functions and variables for connecting to the MySQL database.
 * 
 * Some problems exist in Next.js development mode with persisting connections to a database.
 * This file contains a commonly implemented workaround for this problem. As part of the hot 
 * refresh mechanism, Next.js clears the cache of files when the user saves. Without some 
 * additional handling, this leads to connections continually being added without being disconnected.
 * 
 * The workaround is to store the connection in a global variable if we are in development mode. This
 * persists across saves, and we are able to use the same connection for the duration of development.
 * 
 * @see https://nextjs.org/docs/basic-features/fast-refresh - Fast Refresh documentation
 * @see https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices - Code modeled after this
 * @see https://github.com/mongodb-developer/nextjs-with-mongodb/blob/main/lib/mongodb.js - Code modeled after this
 * 
 */
import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  database: "NoteApp",
};

/**
 * Initializes a connection to the MySQL database.
 * @returns {Promise<mysql.Connection>}
 */
async function initializeConnection() {
  return await mysql.createConnection(config);
}

/**
 * @type {Promise<mysql.Connection>} connection
 */
const connection = globalThis.mysqlConnection ?? initializeConnection();
export default connection;

// If not production, update global to match connection.
if(process.env.NODE_ENV !== "production") globalThis.mysqlConnection = connection;

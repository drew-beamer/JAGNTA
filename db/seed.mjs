import mysql2 from "mysql2/promise";
import fs from "fs";
import { getUniqueNonStopwords } from "./stopword.mjs";

const config = {
  host: "localhost",
  user: "root",
  database: "NoteApp",
};

/**
 * Given a path an a filename, returns the necessary information about the file to be
 * inserted into the Notes/NotesIndex tables
 * 
 * @param {string} path location of the file
 * @param {string} filename name of the file (should be .txt)
 * @returns 
 */
function getFileData(path, filename) {
  const noteTitle = filename.slice(0, filename.length - 4).replace(/-/g, " ");
  const contents = fs.readFileSync(path);
  const uniqueNonStopwords = getUniqueNonStopwords(contents.toString());
  return { noteTitle, contents, uniqueNonStopwords };
}

const connection = await mysql2.createConnection(config);

const files = fs.readdirSync("./sample-data");
for (let fileIndex in files) {
  const filename = files[fileIndex];
  const path = `./sample-data/${filename}`;
  const { noteTitle, contents, uniqueNonStopwords } = getFileData(
    path,
    filename
  );
  await connection.beginTransaction();
  await connection.query("INSERT INTO Notes (title, content) VALUES (?, ?)", [
    noteTitle,
    contents,
  ]);

  // Gets last inserted ID
  const id = (await connection.query("SELECT LAST_INSERT_ID()"))[0][0]["LAST_INSERT_ID()"];

  // Add each word to the "index"
  for (const { word, index } of uniqueNonStopwords) {
    await connection.query("INSERT IGNORE INTO NotesIndex VALUES (?, ?, ?)", [
      id,
      word,
      index,
    ]);
  }
  console.log("insert successful")

  await connection.commit();
}
await connection.end();

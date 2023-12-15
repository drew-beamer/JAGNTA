DROP SCHEMA IF EXISTS NoteApp;

CREATE SCHEMA NoteApp;

USE NoteApp;

CREATE TABLE
    Notes (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(1024) NOT NULL,
        content MEDIUMTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        parent_id INT,
        PRIMARY KEY (id)
    );

CREATE TABLE
    NotesIndex (
        id INT NOT NULL AUTO_INCREMENT,
        word VARCHAR(128) NOT NULL,
        wordIndex INT NOT NULL,
        PRIMARY KEY (id, word, wordIndex),
        FOREIGN KEY (id) REFERENCES Notes (id) ON DELETE CASCADE
    );
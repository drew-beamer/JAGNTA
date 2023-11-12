DROP SCHEMA IF EXISTS NoteApp;
CREATE SCHEMA NoteApp;
USE NoteApp;

/*
CREATE TABLE Users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
*/

CREATE TABLE Notes (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(1024) NOT NULL,
    content MEDIUMTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    parent_id INT,
    PRIMARY KEY (id)
);

INSERT INTO Notes (title, content) VALUES ('Note 1', 'This is the content of note 1');
INSERT INTO Notes (title, content) VALUES ('Note 2', 'This is the content of note 2');

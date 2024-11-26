BEGIN;

CREATE TABLE
    dueño (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        lastname TEXT NOT NULL,
        phone VARCHAR(15)
    );

CREATE TABLE
    animal (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        species TEXT NOT NULL,
        dueño_id INT REFERENCES dueño (id) ON DELETE SET NULL
    );

CREATE TABLE
    vendedor (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        lastname TEXT NOT NULL,
        phone VARCHAR(15),
        company TEXT
    );

CREATE TABLE
    comprador (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        lastname TEXT NOT NULL,
        phone VARCHAR(15),
        company TEXT
    );

COMMIT;
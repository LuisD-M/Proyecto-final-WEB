--\c app;

BEGIN transaction;
\c app;
CREATE TABLE
    dueno (
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
        dueño_id INT REFERENCES dueno (id) ON DELETE SET NULL
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

COMMIT transaction;
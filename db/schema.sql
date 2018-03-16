CREATE TABLE IF NOT EXISTS users(
    id bigserial primary key,
    name varchar(30) not null,
    email character varying(255),
    password character varying(255),
    role_id integer DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TYPE mood AS ENUM ('sad', 'ok', 'happy')

CREATE TABLE IF NOT EXISTS companies(
    city character varying(30),
    name character varying(40),
    employers integer[],
    country character varying(30),
    date_foundation timestamp DEFAULT NOW()
);
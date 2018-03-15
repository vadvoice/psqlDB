create table users(
    id bigserial primary key,
    name varchar(30) not null,
    email character varying(255),
    password character varying(255),
    role_id integer,
    created_at TIMESTAMP DEFAULT NOW()
);

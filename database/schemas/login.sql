begin transaction;

create table login(
    user_id serial primary key,
    username varchar(50) not null unique,
    email text not null unique,
    hash varchar(255) not null,

    FOREIGN KEY (username) REFERENCES users(username)
);

commit;

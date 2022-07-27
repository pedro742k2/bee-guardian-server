begin transaction;

create table users (
    username varchar(50) primary key,
    email text not null unique,
    name varchar(100) not null,
    phone int not null unique,
    join_date timestamp not null 
);

commit;

-- psql -U postgres -d bee-pap -a -f \\wsl.localhost\Ubuntu\home\guilherme\bee-project-pap\database\deploy_schemas.sql
begin transaction;

create table user_hives(
    hive_id integer not null,
    hive_user_id integer not null,

    FOREIGN KEY (hive_id) REFERENCES hives(hive_id),
    FOREIGN KEY (hive_user_id) REFERENCES login(user_id),

    PRIMARY KEY (hive_id, hive_user_id)
);

commit;
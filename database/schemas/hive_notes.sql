begin transaction;

create table hive_notes(
    note_id serial primary key,
    hive_id integer not null,
    note text not null,
    added_by text not null,
    added_date timestamp not null,

    FOREIGN KEY (hive_id) REFERENCES hives(hive_id)
);

commit;
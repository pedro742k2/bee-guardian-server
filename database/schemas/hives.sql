begin transaction;

create table hives(
    hive_id integer primary key,
    hive_details text not null,
    add_date timestamp not null
);

commit;
begin transaction;

create table hives(
    hive_id integer primary key,
    hive_details text not null,
    tare_weight decimal not null default 0,
    add_date timestamp not null
);

commit;
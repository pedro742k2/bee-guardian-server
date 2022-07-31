begin transaction;

create table hive_readings(
    reading_id serial primary key,
    hive_id integer not null,
    internal_temperature decimal not null,
    external_temperature decimal not null,
    humidity smallint not null,
    weight decimal not null,
    solar_panel_voltage decimal not null,
    battery smallint not null,
    reading_date timestamp not null,
    
    FOREIGN KEY (hive_id) REFERENCES hives(hive_id)
);

commit;
-- Deploy database tables
\i '/docker-entrypoint-initdb.d/schemas/users.sql'
\i '/docker-entrypoint-initdb.d/schemas/login.sql'
\i '/docker-entrypoint-initdb.d/schemas/hives.sql'
\i '/docker-entrypoint-initdb.d/schemas/user_hives.sql'
\i '/docker-entrypoint-initdb.d/schemas/hive_readings.sql'

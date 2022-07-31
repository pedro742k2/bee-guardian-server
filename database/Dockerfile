FROM postgres:14.2

ADD /schemas/ /docker-entrypoint-initdb.d/schemas

ADD deploy_schemas.sql /docker-entrypoint-initdb.d
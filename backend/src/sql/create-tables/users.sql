drop table users;
create table users (
                       id serial primary key,
                       first_name varchar(255) default null,
                       last_name varchar(255) default null,
                       email varchar(255) default null,
                       password varchar(500) not null,
                       created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                       updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

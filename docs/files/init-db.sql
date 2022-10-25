CREATE DATABASE "sensors-monitor1";

CREATE TABLE IF NOT EXISTS public.sensor_types
(
    type character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT sensor_types_pkey PRIMARY KEY (type)
);

CREATE TABLE IF NOT EXISTS public.sensor_units
(
    unit character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT sensor_units_pkey PRIMARY KEY (unit)
);

CREATE TABLE IF NOT EXISTS public.sensors
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    model character varying(15) COLLATE pg_catalog."default" NOT NULL,
    range_from integer,
    range_to integer,
    type character varying COLLATE pg_catalog."default" NOT NULL,
    unit character varying COLLATE pg_catalog."default" NOT NULL,
    location character varying(40) COLLATE pg_catalog."default",
    description character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT sensors_pkey PRIMARY KEY (id),
    CONSTRAINT type_to_sensor_types_fk FOREIGN KEY (type)
        REFERENCES public.sensor_types (type) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT unit_to_sensor_units_fk FOREIGN KEY (unit)
        REFERENCES public.sensor_units (unit) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.users
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    username character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    role character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

INSERT INTO public.sensor_types(type)
VALUES ('Humidity'), ('Pressure'), ('Temperature'), ('Voltage');

INSERT INTO public.sensor_units(unit)
VALUES ('bar'), ('voltage'), ('°С'), ('%');

INSERT INTO public.sensors(name, model, range_from, range_to, type, unit, location, description)
VALUES ('Sensor 1', 'PC33-561', 0, 14, 'Pressure', 'bar', 'NULL', 'ggggg'),
       ('Sensor 2', 'PC33-56888', 26, 106, 'Pressure', 'bar', 'Room1', 'cats gogo'),
       ('Sensor 3', 'PC33-5682', 29, 50, 'Humidity', 'bar', 'NULL', 'ggggg'),
       ('Sensor 11', 'PC23-56828', 0, 13, 'Temperature', '%', 'NULL', 'i like frogs54'),
       ('Sensor 90', 'PC31-56888', 0, 1, 'Pressure', 'bar', 'Room2', 'ggggg');

INSERT INTO public.users(username, password, role)
VALUES ('admin', '$2a$12$M1CNcFXC7tPDkLpULLiijeOCyayBxaJta4/Gubp7zlk5TlaPZSkIi', 'ADMINISTRATOR'),
       ('user', '$2a$12$QQGs.aHprRJj1exGARLnkOTt1QvHZVzJ6xqnJB.uy18bIRRWM/lkm', 'VIEWER');
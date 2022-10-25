CREATE DATABASE "sensors-monitor";

ALTER DATABASE "sensors-monitor" OWNER TO postgres;

CREATE TABLE public.sensor_types (
    type character varying NOT NULL
);

CREATE TABLE public.sensor_units (
    unit character varying NOT NULL
);

CREATE TABLE public.sensors (
    id bigint NOT NULL,
    name character varying(30) NOT NULL,
    model character varying(15) NOT NULL,
    range_from integer,
    range_to integer,
    type character varying NOT NULL,
    unit character varying NOT NULL,
    location character varying(40),
    description character varying(200)
);

ALTER TABLE public.sensors ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sensors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.users (
  id bigint NOT NULL,
  username character varying NOT NULL,
  password character varying NOT NULL,
  role character varying NOT NULL
);

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

COPY public.sensor_types (type) FROM stdin;
Pressure
Voltage
Temperature
Humidity
\.

COPY public.sensor_units (unit) FROM stdin;
bar
voltage
°С
%
\.

COPY public.sensors (id, name, model, range_from, range_to, type, unit, location, description) FROM stdin;
49	Sensor 1111111111111111	PC33-561	0	14	Pressure	bar	\N	ggggg
52	Sensor 111	PC33-56888	26	106	Pressure	bar	Room1	cats gogo
46	Sensor 1111	PC33-56888	29	50	Humidity	bar	Room1	\N
36	Sensor 1111111111111111	PC33-56888	0	13	Pressure	bar	\N	ggggg
48	Sensor 1111111111111111	PC33-56888	0	1	Pressure	bar	\N	ggggg
47	Sensor 111	PC33-56888	26	89	Pressure	bar	Room1	cats gogo
50	Sensor 1	PC33-561	18	35	Temperature	°С	Room1	i like frogs54
45	THIS	PC33-561	18	37	Temperature	°С	Room1	i like frogs54
\.

COPY public.users (id, username, password, role) FROM stdin;
1	admin	$2a$12$M1CNcFXC7tPDkLpULLiijeOCyayBxaJta4/Gubp7zlk5TlaPZSkIi	ADMINISTRATOR
2	user	$2a$12$QQGs.aHprRJj1exGARLnkOTt1QvHZVzJ6xqnJB.uy18bIRRWM/lkm	VIEWER
\.

SELECT pg_catalog.setval('public.sensors_id_seq', 53, true);

SELECT pg_catalog.setval('public.users_id_seq', 2, true);

ALTER TABLE ONLY public.sensor_types
    ADD CONSTRAINT sensor_types_pkey PRIMARY KEY (type);

ALTER TABLE ONLY public.sensor_units
    ADD CONSTRAINT sensor_units_pkey PRIMARY KEY (unit);

ALTER TABLE ONLY public.sensors
    ADD CONSTRAINT sensors_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.sensors
    ADD CONSTRAINT type_to_sensor_types_fk FOREIGN KEY (type) REFERENCES public.sensor_types(type);


ALTER TABLE ONLY public.sensors
    ADD CONSTRAINT unit_to_sensor_units_fk FOREIGN KEY (unit) REFERENCES public.sensor_units(unit);
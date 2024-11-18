

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE public.admin (
    id integer NOT NULL,
    nombres character varying(25) NOT NULL,
    apellidos character varying(25) NOT NULL,
    telefono integer NOT NULL,
    correo character varying(30) NOT NULL,
    horario time without time zone NOT NULL,
    password character varying(120) NOT NULL
);


ALTER TABLE public.admin OWNER TO postgres;

CREATE SEQUENCE public.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_id_seq OWNER TO postgres;

ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;

CREATE TABLE public.aliados (
    id integer NOT NULL,
    nombre character varying(25) NOT NULL,
    responsable character varying(25) NOT NULL,
    direccion character varying(30) NOT NULL,
    pedidos integer NOT NULL
);

ALTER TABLE public.aliados OWNER TO postgres;

CREATE SEQUENCE public.aliados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.aliados_id_seq OWNER TO postgres;

ALTER SEQUENCE public.aliados_id_seq OWNED BY public.aliados.id;

CREATE TABLE public.carrito (
    id integer NOT NULL,
    id_user integer NOT NULL,
    id_producto integer NOT NULL,
    extras character varying,
    total_price bigint,
    imagen text
);


ALTER TABLE public.carrito OWNER TO postgres;


CREATE SEQUENCE public.carrito_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carrito_id_seq OWNER TO postgres;

ALTER SEQUENCE public.carrito_id_seq OWNED BY public.carrito.id;


CREATE TABLE public.creados (
    id integer NOT NULL,
    id_user integer NOT NULL,
    id_admin integer NOT NULL,
    publico character(3),
    aceptado character(3),
    medidas character varying(30) NOT NULL,
    descripcion text NOT NULL,
    precio integer,
    color character varying(20) NOT NULL,
    materiales character varying(20) NOT NULL,
    nombre character varying(20) NOT NULL
);

ALTER TABLE public.creados OWNER TO postgres;

CREATE SEQUENCE public.creados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.creados_id_seq OWNER TO postgres;

ALTER SEQUENCE public.creados_id_seq OWNED BY public.creados.id;

CREATE TABLE public.productos (
    id integer NOT NULL,
    categoria character varying(17) NOT NULL,
    nombre character varying(50) NOT NULL,
    imagen character varying(100) NOT NULL,
    precio integer NOT NULL,
    color character varying(20) NOT NULL,
    materiales character varying(200) NOT NULL,
    medidas character varying(200) NOT NULL,
    descripcion text NOT NULL
);

ALTER TABLE public.productos OWNER TO postgres;

CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.productos_id_seq OWNER TO postgres;

ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;


CREATE TABLE public.sugerencias (
    id integer NOT NULL,
    id_admin integer,
    name_user character varying(120),
    categoria character varying(70),
    telefono integer,
    correo_user character varying(120),
    sugerencia text
);


ALTER TABLE public.sugerencias OWNER TO postgres;

CREATE SEQUENCE public.sugerencias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sugerencias_id_seq OWNER TO postgres;

ALTER SEQUENCE public.sugerencias_id_seq OWNED BY public.sugerencias.id;


CREATE TABLE public.users (
    id integer NOT NULL,
    correo character varying(30) NOT NULL,
    password character varying(200) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;


CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

ALTER SEQUENCE public.user_id_seq OWNED BY public.users.id;

ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);

ALTER TABLE ONLY public.aliados ALTER COLUMN id SET DEFAULT nextval('public.aliados_id_seq'::regclass);

ALTER TABLE ONLY public.carrito ALTER COLUMN id SET DEFAULT nextval('public.carrito_id_seq'::regclass);

ALTER TABLE ONLY public.creados ALTER COLUMN id SET DEFAULT nextval('public.creados_id_seq'::regclass);

ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);

ALTER TABLE ONLY public.sugerencias ALTER COLUMN id SET DEFAULT nextval('public.sugerencias_id_seq'::regclass);

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);

COPY public.admin (id, nombres, apellidos, telefono, correo, horario, password) FROM stdin;
1	hola	hola	32	hola@gmail.com	16:21:29	$2a$10$6.JbSz4cgddCvS8niQOV9eXAR1kmVCHUU1t3tKTNDi8dHPMQpMdnW
\.


COPY public.aliados (id, nombre, responsable, direccion, pedidos) FROM stdin;
\.


COPY public.carrito (id, id_user, id_producto, extras, total_price, imagen) FROM stdin;
16	3	1	none	100	https://img.freepik.com/foto-gratis/jumbo-jet-volando-cielo_23-2150895681.jpg?semt=ais_hybrid
17	3	1	none	100	https://img.freepik.com/foto-gratis/jumbo-jet-volando-cielo_23-2150895681.jpg?semt=ais_hybrid
18	3	1	none	100	https://img.freepik.com/foto-gratis/jumbo-jet-volando-cielo_23-2150895681.jpg?semt=ais_hybrid
19	3	1	none	100	https://img.freepik.com/foto-gratis/jumbo-jet-volando-cielo_23-2150895681.jpg?semt=ais_hybrid
20	11	1	none	100	https://img.freepik.com/foto-gratis/jumbo-jet-volando-cielo_23-2150895681.jpg?semt=ais_hybrid
\.


COPY public.creados (id, id_user, id_admin, publico, aceptado, medidas, descripcion, precio, color, materiales, nombre) FROM stdin;
\.

COPY public.productos (id, categoria, nombre, imagen, precio, color, materiales, medidas, descripcion) FROM stdin;
1	j	j	https://img.freepik.com/foto-gratis/jumbo-jet-volando-cielo_23-2150895681.jpg?semt=ais_hybrid	111	gg	fs	dsa	das
\.


COPY public.sugerencias (id, id_admin, name_user, categoria, telefono, correo_user, sugerencia) FROM stdin;
\.

COPY public.users (id, correo, password) FROM stdin;
1		$2a$14$SdfIFMxo2ZAWXyj3XdrUYepvLtuDITvwwgzn/.CA2nDw8MYBZOFKC
2		$2a$14$lMLQ5g9xucl7g0uE5MyJNupy8DFM7v7phO3NtFvfOMAh0gafWtbg.
3	123	$2a$14$fBfjp9NDKdKOzBVliC/vMOUuF4ug7t/JhrHu2KgyQBKxvvtsyzPe6
4	hola	$2a$14$a.fDrDo.o5QFwQRKxKXOFuxhWnxjhRvS5ZiC/D66OhBlgfAIVlAzy
5	hola 	$2a$14$KsghJ5dk3A1.fklBFONwf.yjEf85yjqjkWqt.P50VFaxy3/pu.nAu
6	1	$2a$14$mhHKBMjlvABsYORInJ2VdebKAK/5GyQfeJXhJJNfJGLWCSEoQBcpO
7	hola	$2a$14$Br8xSIfthcDsuKXiXACKCeJXwU33S7ONvSHU8Vk4CSZIz2r1rJyaC
8	hola	$2a$14$hgOMGwtUiYfhsfUPiuMo/.VGFJo2P0GFR166enVFj.WBdwmdnuKiC
9	p	$2a$14$OfMkgzrzU0Ad1oh1p3hjgOtye9HqTl5oLIwnUT7PMXvHGwH8nvjIu
10	tt	$2a$14$wYBMClU4.OIMhWSMU/wKnOWuo1PnRJBUstJ6vB.CVuugiUe0WIS6S
11	ttt	$2a$14$QAaTcofuDOi3lBzfU4O0OuGz.94IS.5GJBLcOcGK23xhJI5abYN/2
\.

SELECT pg_catalog.setval('public.admin_id_seq', 1, false);

SELECT pg_catalog.setval('public.aliados_id_seq', 1, false);

SELECT pg_catalog.setval('public.carrito_id_seq', 20, true);

SELECT pg_catalog.setval('public.creados_id_seq', 1, false);

SELECT pg_catalog.setval('public.productos_id_seq', 1, true);

SELECT pg_catalog.setval('public.sugerencias_id_seq', 1, false);

SELECT pg_catalog.setval('public.user_id_seq', 11, true);

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.aliados
    ADD CONSTRAINT aliados_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.creados
    ADD CONSTRAINT creados_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.sugerencias
    ADD CONSTRAINT sugerencias_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id);

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);

ALTER TABLE ONLY public.creados
    ADD CONSTRAINT creados_id_admin_fkey FOREIGN KEY (id_admin) REFERENCES public.admin(id);

ALTER TABLE ONLY public.creados
    ADD CONSTRAINT creados_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);

ALTER TABLE ONLY public.sugerencias
    ADD CONSTRAINT sugerencias_id_admin_fkey FOREIGN KEY (id_admin) REFERENCES public.admin(id);



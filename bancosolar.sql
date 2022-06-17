--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: transferencias; Type: TABLE; Schema: public; Owner: xiin
--

CREATE TABLE public.transferencias (
    id integer NOT NULL,
    emisor integer,
    receptor integer,
    monto double precision,
    fecha timestamp without time zone
);


ALTER TABLE public.transferencias OWNER TO xiin;

--
-- Name: transferencias_id_seq; Type: SEQUENCE; Schema: public; Owner: xiin
--

CREATE SEQUENCE public.transferencias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transferencias_id_seq OWNER TO xiin;

--
-- Name: transferencias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: xiin
--

ALTER SEQUENCE public.transferencias_id_seq OWNED BY public.transferencias.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: xiin
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(50),
    balance double precision,
    CONSTRAINT usuarios_balance_check CHECK ((balance >= (0)::double precision))
);


ALTER TABLE public.usuarios OWNER TO xiin;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: xiin
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_seq OWNER TO xiin;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: xiin
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: transferencias id; Type: DEFAULT; Schema: public; Owner: xiin
--

ALTER TABLE ONLY public.transferencias ALTER COLUMN id SET DEFAULT nextval('public.transferencias_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: xiin
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: transferencias; Type: TABLE DATA; Schema: public; Owner: xiin
--

COPY public.transferencias (id, emisor, receptor, monto, fecha) FROM stdin;
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: xiin
--

COPY public.usuarios (id, nombre, balance) FROM stdin;
\.


--
-- Name: transferencias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: xiin
--

SELECT pg_catalog.setval('public.transferencias_id_seq', 1, false);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: xiin
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 1, false);


--
-- Name: transferencias transferencias_pkey; Type: CONSTRAINT; Schema: public; Owner: xiin
--

ALTER TABLE ONLY public.transferencias
    ADD CONSTRAINT transferencias_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: xiin
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: transferencias transferencias_emisor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: xiin
--

ALTER TABLE ONLY public.transferencias
    ADD CONSTRAINT transferencias_emisor_fkey FOREIGN KEY (emisor) REFERENCES public.usuarios(id);


--
-- Name: transferencias transferencias_receptor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: xiin
--

ALTER TABLE ONLY public.transferencias
    ADD CONSTRAINT transferencias_receptor_fkey FOREIGN KEY (receptor) REFERENCES public.usuarios(id);


--
-- PostgreSQL database dump complete
--


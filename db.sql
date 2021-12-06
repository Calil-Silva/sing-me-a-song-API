--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

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
-- Name: recommendations; Type: TABLE; Schema: public; Owner: calilrennersilva
--

CREATE TABLE public.recommendations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    link character varying(255) NOT NULL,
    removed_date date
);


ALTER TABLE public.recommendations OWNER TO calilrennersilva;

--
-- Name: recommendations_id_seq; Type: SEQUENCE; Schema: public; Owner: calilrennersilva
--

CREATE SEQUENCE public.recommendations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recommendations_id_seq OWNER TO calilrennersilva;

--
-- Name: recommendations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: calilrennersilva
--

ALTER SEQUENCE public.recommendations_id_seq OWNED BY public.recommendations.id;


--
-- Name: score_board; Type: TABLE; Schema: public; Owner: calilrennersilva
--

CREATE TABLE public.score_board (
    id integer NOT NULL,
    rec_id integer NOT NULL,
    type character varying(255) NOT NULL
);


ALTER TABLE public.score_board OWNER TO calilrennersilva;

--
-- Name: score_board_id_seq; Type: SEQUENCE; Schema: public; Owner: calilrennersilva
--

CREATE SEQUENCE public.score_board_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.score_board_id_seq OWNER TO calilrennersilva;

--
-- Name: score_board_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: calilrennersilva
--

ALTER SEQUENCE public.score_board_id_seq OWNED BY public.score_board.id;


--
-- Name: recommendations id; Type: DEFAULT; Schema: public; Owner: calilrennersilva
--

ALTER TABLE ONLY public.recommendations ALTER COLUMN id SET DEFAULT nextval('public.recommendations_id_seq'::regclass);


--
-- Name: score_board id; Type: DEFAULT; Schema: public; Owner: calilrennersilva
--

ALTER TABLE ONLY public.score_board ALTER COLUMN id SET DEFAULT nextval('public.score_board_id_seq'::regclass);


--
-- Data for Name: recommendations; Type: TABLE DATA; Schema: public; Owner: calilrennersilva
--

COPY public.recommendations (id, name, link, removed_date) FROM stdin;
1	Falamansa - Xote dos Milagres	https://www.youtube.com/watch?v=chwyjJbcs1Y	\N
3	I Surrender (feat. Lauren Daigle) - Hillsong UNITED	https://www.youtube.com/watch?v=A4N2ausO6Sw&list=RDA4N2ausO6Sw&start_radio=1	\N
4	Hillsong United - Oceans (Live show at Caesarea)	https://www.youtube.com/watch?v=HVAR85rorvU&list=RDA4N2ausO6Sw&index=2	\N
5	Snow Patrol - Open Your Eyes (Official Video)	https://www.youtube.com/watch?v=fk1Q9y6VVy0&list=RDA4N2ausO6Sw&index=4	\N
6	Coldplay - Fix You (Live In São Paulo)	https://www.youtube.com/watch?v=AEp08vVYreg&list=RDA4N2ausO6Sw&index=6	\N
7	lofi hip hop radio - beats to relax/study to	https://www.youtube.com/watch?v=5qap5aO4i9A	\N
8	Heavy Rain & Thunder | Rain On Window	https://www.youtube.com/watch?v=CITnFDtMvzA	\N
9	Christmas Instrumental Music	https://www.youtube.com/watch?v=QAERmRPjrdk	\N
10	ARCANE: Goodbye | EPIC COVER (Feat. SORAH)	https://www.youtube.com/watch?v=ZhPW7q0B1Cw	\N
2	Lenny Kravitz - Again	https://www.youtube.com/watch?v=eW2qlKa6oHw&list=RDeW2qlKa6oHw&start_radio=1	\N
\.


--
-- Data for Name: score_board; Type: TABLE DATA; Schema: public; Owner: calilrennersilva
--

COPY public.score_board (id, rec_id, type) FROM stdin;
\.


--
-- Name: recommendations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: calilrennersilva
--

SELECT pg_catalog.setval('public.recommendations_id_seq', 10, true);


--
-- Name: score_board_id_seq; Type: SEQUENCE SET; Schema: public; Owner: calilrennersilva
--

SELECT pg_catalog.setval('public.score_board_id_seq', 50, true);


--
-- Name: recommendations recommendations_pk; Type: CONSTRAINT; Schema: public; Owner: calilrennersilva
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT recommendations_pk PRIMARY KEY (id);


--
-- Name: score_board score_board_pk; Type: CONSTRAINT; Schema: public; Owner: calilrennersilva
--

ALTER TABLE ONLY public.score_board
    ADD CONSTRAINT score_board_pk PRIMARY KEY (id);


--
-- Name: score_board score_board_fk0; Type: FK CONSTRAINT; Schema: public; Owner: calilrennersilva
--

ALTER TABLE ONLY public.score_board
    ADD CONSTRAINT score_board_fk0 FOREIGN KEY (rec_id) REFERENCES public.recommendations(id);


--
-- PostgreSQL database dump complete
--


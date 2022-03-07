CREATE TABLE public.professor (
    id numeric NOT NULL,
    name varchar NOT NULL,
    mail varchar NOT NULL,
    password varchar NOT NULL,
    account_number integer NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE public.student (
    id numeric NOT NULL,
    name varchar NOT NULL,
    mail varchar NOT NULL,
    password varchar NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE public.register (
    id_student numeric NOT NULL,
    id_course integer NOT NULL,
    status varchar NOT NULL,
    PRIMARY KEY (id_student, id_course)
);


CREATE TABLE public.course (
    id SERIAL NOT NULL,
    name varchar NOT NULL,
    price numeric NOT NULL,
    id_level integer NOT NULL,
    id_professor integer NOT NULL,
    id_category integer NOT NULL,
    content varchar NOT NULL,
    horary varchar NOT NULL,
    status char NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.course
    (id_level);
CREATE INDEX ON public.course
    (id_professor);
CREATE INDEX ON public.course
    (id_category);


CREATE TABLE public.category (
    id SERIAL NOT NULL,
    category varchar NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE public.historical (
    id_student numeric NOT NULL,
    id_course integer NOT NULL,
    date date NOT NULL,
    PRIMARY KEY (id_student, id_course)
);


CREATE TABLE public.level (
    id SERIAL NOT NULL,
    level varchar NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE public.tag (
    id SERIAL NOT NULL,
    tag varchar NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE public.tagged (
    id_course integer NOT NULL,
    id_tag integer NOT NULL,
    PRIMARY KEY (id_course, id_tag)
);


ALTER TABLE public.register ADD CONSTRAINT FK_register__id_student FOREIGN KEY (id_student) REFERENCES public.student(id);
ALTER TABLE public.register ADD CONSTRAINT FK_register__id_course FOREIGN KEY (id_course) REFERENCES public.course(id);
ALTER TABLE public.course ADD CONSTRAINT FK_course__id_level FOREIGN KEY (id_level) REFERENCES public.level(id);
ALTER TABLE public.course ADD CONSTRAINT FK_course__id_professor FOREIGN KEY (id_professor) REFERENCES public.professor(id);
ALTER TABLE public.course ADD CONSTRAINT FK_course__id_category FOREIGN KEY (id_category) REFERENCES public.category(id);
ALTER TABLE public.tagged ADD CONSTRAINT FK_tagged__id_course FOREIGN KEY (id_course) REFERENCES public.course(id);
ALTER TABLE public.tagged ADD CONSTRAINT FK_tagged__id_tag FOREIGN KEY (id_tag) REFERENCES public.tag(id);
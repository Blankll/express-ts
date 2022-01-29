
CREATE TABLE public.users (
      id serial CONSTRAINT user_id_pk PRIMARY KEY,
      firstName VARCHAR(255),
      lastName VARCHAR(255),
      batchid bigint,
      created timestamp without time zone NOT NULL DEFAULT current_timestamp,
      updated timestamp without time zone NOT NULL DEFAULT current_timestamp
);


INSERT INTO users("firstName" , "lastName" ,batchid)values('aaa','ccc', 1643356158342);

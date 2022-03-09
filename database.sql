
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "item" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR (80) NOT NULL,
    "image_url" VARCHAR (2083),
    "user_id" INT REFERENCES "user"
);

-- Dummy data to test a new user
INSERT INTO "user" ("username", "password")
VALUES ('cwebby', '1234');

-- Dummy data to test a new item
INSERT INTO "item" ("description", "image_url", "user_id")
VALUES ('Busch Latte', 'https://i.ytimg.com/vi/yh85Agjnado/maxresdefault.jpg', 1);
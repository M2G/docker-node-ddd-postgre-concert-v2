-- -------------------------------------------------------------
-- TablePlus 5.3.6(496)
--
-- https://tableplus.com/
--
-- Database: test_db
-- Generation Time: 2023-05-24 02:35:04.6050
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "username" varchar(255),
    "email" varchar(254) NOT NULL,
    "first_name" varchar(255),
    "last_name" varchar(255),
    "password" varchar(255) NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT statement_timestamp(),
    "modified_at" timestamp NOT NULL DEFAULT statement_timestamp(),
    "reset_password_token" text,
    "reset_password_expires" timestamp NOT NULL DEFAULT statement_timestamp(),
    "deleted_at" int4 DEFAULT 0,
    "last_connected_at" int4 DEFAULT 0,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."users" ("id", "username", "email", "first_name", "last_name", "password", "created_at", "modified_at", "reset_password_token", "reset_password_expires", "deleted_at", "last_connected_at") VALUES
(1, '37DFF4EA4A', 'B35ED4F1E4@C7ADFAAD2F.com', '18080E895D', 'C570E61F9D', '$2a$06$TbLw/W4A/ffS09uiosZDi.Fq7kz3LkVs6O/80ac6bFlmqqCwCJUe2', '2023-04-28 02:54:34.159578', '2023-04-28 02:54:34.159578', 'CC0B0CD006', '2023-04-28 02:54:34.159578', 0, 0),
(36, '', 'smith.jackson@university.com', 'test2', 'test2', '$2b$10$DjMKAl8HLi53R8dgWeE/Fe4at9BBpxCLpbxDE7JAG7Zy4ClQQeg.q', '2023-04-28 03:18:14.652', '2023-04-28 03:18:14.685407', NULL, '2023-04-28 03:18:14.685407', 0, 0),
(37, NULL, 'oliver.garcia@university.com', NULL, NULL, '$2b$10$W3jO3KbLw3eBvCxzxBydTO35.8EzA/EjNsAxBolCIe3D6KV01/OQq', '2023-04-29 00:45:55.366', '2023-04-29 00:45:55.430267', NULL, '2023-04-29 00:45:55.430267', 0, 0),
(38, NULL, 'admin@soundcast.fm', NULL, NULL, '$2b$10$Np7BQLkNeUxBy06Ng/F05uHADPN0GUq6mXUvI9Wliay85olZL1gna', '2023-04-29 01:00:17.374', '2023-04-29 01:00:17.406498', NULL, '2023-04-29 01:00:17.406498', 0, 0);

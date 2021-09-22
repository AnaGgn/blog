CREATE DATABASE blog;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT false
);

INSERT INTO users (email, password, is_admin)
VALUES ('admin@admin.fr', 'admin', true);

CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_user INT REFERENCES users (id) NULL
);

INSERT INTO articles (title, description, content)
VALUES ('Mon premier article', 'Une brève description', 'un contenu un peu plus conséquent'),
('Mon second article', 'Une brève description', 'un contenu un peu plus conséquent'),
('Mon troisième article', 'Une brève description', 'un contenu un peu plus conséquent'),
('Mon quatrième article', 'Une brève description', 'un contenu un peu plus conséquent'),
('Mon cinquième article', 'Une brève description', 'un contenu un peu plus conséquent'),
('Mon sixième article', 'Une brève description', 'un contenu un peu plus conséquent');

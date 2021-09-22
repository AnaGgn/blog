CREATE DATABASE blog;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT false
);

CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_user INT REFERENCES users (id) NOT NULL
);

INSERT INTO users (email, password, is_admin) VALUES ('admin@admin.fr', '$argon2i$v=19$m=4096,t=3,p=1$7F832t1rORyVU25z+qs0qA$VuWY1wflNFNmXIbBavkzATsxOt6GCMvMU2dAZe7yURI', true);

INSERT INTO articles (title, description, content, id_user) VALUES ('Mon premier article', 'Une brève description', 'un contenu un peu plus conséquent', 1), ('Mon second article', 'Une brève description', 'un contenu un peu plus conséquent', 1), ('Mon troisième article', 'Une brève description', 'un contenu un peu plus conséquent', 1), ('Mon quatrième article', 'Une brève description', 'un contenu un peu plus conséquent', 1), ('Mon cinquième article', 'Une brève description', 'un contenu un peu plus conséquent', 1), ('Mon sixième article', 'Une brève description', 'un contenu un peu plus conséquent', 1);

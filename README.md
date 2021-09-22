# Documentation: Mon blog

## Prérequis

Avoir npm et postgres d'installé

### Installation et mise en place

$ git clone https://github.com/AnaGgn/blog.git <br/>
$ cd blog <br/>
$ npm i <br/>
$ cd api <br/>
$ npm i

Dans le dossier api où vous vous trouvez créer un fichier .env avec les variables suivantes

DB_USER=<YOUR DB_USER> <br/>
HOST=<YOUR DB_HOST> <br/>
PASSWORD=<YOUR DB_PASSWORD> <br/>
JWT_PRIVATE_KEY=<YOUR JWT_PRIVATE_KEY>

si vous n'avez pas de JWT_PRIVATE_KEY vous pouvez en générer une ici : [http://travistidwell.com/jsencrypt/demo/]

### Lancement

1. Lancer la base postgres
2. passer les scripts contenu dans api/sql/dump.sql pour avoir la configuration de la BDD
3. dans un terminal placé sur blog/api :
$ node server.js
4. dans un terminal placé sur blog:
$ npm start

### Connexion

Un compte admin est paramétré par défaut avec les identifiants de connection suivants:

Email : admin@admin.fr <br/>
Mot de passe: admin


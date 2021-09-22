require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;

const articleRoutes = require('./src/article/routes');
const homeRoutes = require('./src/home/routes');
const userRoutes = require('./src/user/routes');
const loginRoutes = require('./src/login/routes');

const extractToken = require('./src/middlewares/extractToken');
const requireAuth = require('./src/middlewares/requireAuth');

var cors = require('cors');
app.use(cors());
app.use(express.urlencoded({extended: true}));
// parser
app.use(extractToken);
app.use(express.json());



app.use("/articles", requireAuth, articleRoutes);
app.use("/home", requireAuth, homeRoutes);
app.use("/users", userRoutes);
app.use("/login", loginRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const loginApi = require("./server/login");
const registerApi = require("./server/register");
const checkApi = require("./server/check");
const postApi = require("./server/posts");
const hashtagApi = require("./server/hashtags")
const commentApi = require("./server/comments")
const verifiedApi = require("./server/verify")

app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cookieParser());
app.use(checkApi);
app.use(loginApi);
app.use(postApi); 
app.use(hashtagApi);
app.use(registerApi);
app.use(commentApi);
app.use(verifiedApi);

const db = 'mongodb+srv://Admin:gCLe2OnO9gbcL8wF@twitter.6jwx7au.mongodb.net/twitter';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.connection.on('connected', () => {
  console.log('Connected with database');
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server up and running on port ${process.env.PORT || 8080}`);
});
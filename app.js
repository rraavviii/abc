const express = require('express');
const app = express();
const fs = require('fs');
const path = require("path");
const db=require('./config/mongoose-connection')

const cookieParser = require('cookie-parser');

const ownersRouter=require("./routes/ownersRouter")
const productsRouter=require("./routes/productsRouter")
const usersRouter=require("./routes/usersRouter")
const indexpage=require("./routes/index")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressSession=require('express-session')
const flash=require("connect-flash")
require("dotenv").config();

const port = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
)
app.use(flash())
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)
app.use('/',indexpage)




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

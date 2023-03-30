//express
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

//routes
const category = require("./routes/category")
const todo = require("./routes/todo");
//server
const mysql = require("mysql2");
const port = process.env.PORT;
const connection = mysql.createConnection({
    host: process.env.HOST,
    user:  process.env.USER,
    password:  process.env.PASSWORD,
    database:  process.env.DATABASE
})

app.use((req, res, next) => {
    req.connection = connection;
    next();
});

app.use('/todo', todo);
app.use('/category', category);

app.listen(port, () => {

})


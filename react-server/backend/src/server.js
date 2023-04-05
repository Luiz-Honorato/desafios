
const express = require("express");
const app = express();
require("dotenv").config();

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

connection.query('SELECT 1', (error, result) => {
    if(error){
        console.log(error)
    } else {
        console.log(result);
    }
})
app.use(express.json())
app.use((req, res, next) => {
    req.connection = connection;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});


app.get('/name', (req, res) => {
    req.connection.query('SELECT * FROM nomes.list', (error, result) => {
        if(error) {
            res.send(error);
            console.log(error)
        } else {
            res.send(result);
        }
    })
})

app.post('/name', (req, res) => {
    const {firstName} = req.body;
    let query = `INSERT INTO nomes.list (firstName)`;
    if (firstName) {
        query += ` VALUES ('${firstName}')`;
        req.connection.query(query, (error, result) => {
            if(error) {
                res.status(404).send();
                console.log(error);
            } else {
                res.send("Created");
            }
        })
    } else {
        res.status(400).res.send('Bad Request')
    }
})
app.listen(8686, () => {
    console.log("servidor rodando")
})



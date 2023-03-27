const express = require("express");
const app = express();
app.use(express.json());
const mysql = require("mysql2");
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'L128738r%',
    database: 'task-list'
})

app.get('/todo', (req, res) => {
    let query = `SELECT * FROM todo`
    if (req.query.showDeleted != "1") {
        query += ` WHERE delete_at IS NULL`
    }

    connection.query(query, (error, result) => {
        if (error) {
            res.status(404).send();
        } else {
            res.send(result);
        }
    })
})

app.get('/todo/:id', (req, res) => {
    let query = `SELECT * FROM todo WHERE id=${req.params.id}`;
    if (req.query.showDeleted != "1") {
        query += ` AND delete_at IS NULL`;
    }
    connection.query(query, (error, result) => {
        if (error) {
            res.status(404).send();
            console.log(error)
        } else {
            res.send(result);
        }
    })
})

app.post('/todo', (req, res) => {
    let { title, description, category_id } = req.body;
    if (title && description && category_id) {
        connection.query(`INSERT INTO todo (title, description, category_id) VALUES ('${title}', '${description}', ${category_id})`
            , (error, result) => {
                if (error) {
                    res.status(500);
                    res.send("ERROR SERVER");
                    console.log(error);
                } else {
                    res.status(200);
                    res.send();
                }
            })
    } else {
        res.status(400);
        res.send("BAD REQUEST");
    }

})

app.put('/todo/:id', (req, res) => {
    if (req.params.id) {
        let { title, description, category_id,} = req.body;
        if (title && description && category_id) {
            update_at = 'NOW()';
            connection.query(`UPDATE todo SET title='${title}', description='${description}', update_at=NOW(), category_id=${category_id} WHERE id=${req.params.id}`
                , (error, result) => {
                    if (error) {
                        res.status(500);
                        res.send("SERVER ERROR");
                        console.log(error);
                    } else {
                        res.status(200);
                        res.send();
                    }
                })
        }
    } else {
        res.send("BAD REQUEST")
    }
})

app.delete('/todo/:id', (req, res) => {
    if(req.params.id) {
    
        connection.query(`UPDATE todo SET delete_at=NOW() WHERE id = ${req.params.id}`
        , (error, result) => {
            if (error) {
                res.status(500);
                res.send("SERVER ERROR");
                console.log(error)
            } else {
                res.status(200);
                res.send();
            }
        })
    } else {
        res.status(400);
        res.send("BAD REQUEST");
    }
})

app.listen(port, () => {

})
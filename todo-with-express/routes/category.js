const express = require("express");
const router = express.Router();

router.get('/list', (req, res) => {
    let query = `SELECT * FROM category`
    if (req.query.showDeleted != "1") {
        query += ` WHERE delete_at IS NULL`
    }
    req.connection.query(query, (error, result) => {
        if (error) {
            res.status(404).send();
        } else {
            res.send(result);
        }
    })

})

router.get('/list/:id', (req, res) => {
    let query = `SELECT * FROM category WHERE id=${req.params.id}`;
    if (req.query.showDeleted != "1") {
        query += ` AND delete_at IS NULL`
    }
    req.connection.query(query, (error, result) => {
        if (error) {
            res.status(404).send();
        } else {
            res.send(result);
        }
    })
});

router.post('/post', (req, res) => {
    const {name} = req.body;
    let query = `INSERT INTO category (name)`;
    if (name) {
        query += ` VALUES ('${name}')`;
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

router.put('/put/:id', (req, res) => {
    const {name} = req.body;
    if(name && 'delete_at'=='NULL') {
        req.connection.query(`UPDATE category SET name='${name}', update_at=NOW() WHERE id=${req.params.id}`
        , (error, result) => {
            if(error) {
                res.status(404).send()
                console.log(error)
            } else {
                res.send('Created');
            }
        })
    } else {
        res.status(400)
        res.send("BAD REQUEST")
    }
})

router.delete('/delete/:id', (req, res) => {
    req.connection.query(`UPDATE category SET delete_at=NOW() WHERE id=${req.params.id}`, (error, result) => {
        if(error) {
            res.status(404).res.send();
            console.log(error)
        } else {
            res.send("Deleted");
        }
    })
})

module.exports = router;

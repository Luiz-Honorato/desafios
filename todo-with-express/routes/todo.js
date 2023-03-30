const express = require("express");
const router = express.Router();

router.get('/list', (req, res) => {
    let query = `SELECT * FROM todo`
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
  let query = `SELECT * FROM todo WHERE id=${req.params.id}`;
  if(req.query.showDeleted != "1")  {
    query += ` AND delete_at IS NULL`
  }
  req.connection.query(query, (error, result) => {
    if(error) {
        res.status(404).send();
    } else {
        res.send(result);
    }
  })
});

router.post('/post', (req, res) => {
    const {title, description, category_id} = req.body;
    let query = `INSERT INTO todo (title, description, category_id)`;
    if (title && description && category_id) {
        query += ` VALUES ('${title}', '${description}', ${category_id})`;
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
    const {title, description, category_id} = req.body;
    if(title && description && category_id && 'delete_at'=='NULL') {
        req.connection.query(`UPDATE todo SET title='${title}', description='${description}', category_id=${category_id}, update_at=NOW() WHERE id=${req.params.id}`
        , (error, result) => {
            if(error) {
                console.log(error)
                res.status(404).send()
            } else {
                res.send('Created');
            }
        })
    } else {
        res.status(400)
        res.send("Bad Request")
    }
})

router.delete('/delete/:id', (req, res) => {
    req.connection.query(`UPDATE todo SET delete_at=NOW() WHERE id=${req.params.id}`, (error, result) => {
        if(error) {
            res.status(404).res.send();
            console.log(error)
        } else {
            res.send("Dleted");
        }
    })
})

module.exports = router;
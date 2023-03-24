function addCategory(req, res, url, connection) {
  res.statusCode = 201;
  let data = "";
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    let task = JSON.parse(data);

    if (task.name) {
      connection.query(`INSERT INTO category (name) VALUES ('${task.name}')`,
        (error, result) => {
          if (error) {
            res.statusCode = 500;
            res.end("SERVER ERROR" + error);
          } else {
            res.statusCode = 201;
            res.end("CREATED.")
          }
        })

    } else {
      res.statusCode = 400;
      res.end("BAD REQUEST")
    }
  })
}

function listCategories(req, res, url, connection) {
  res.setHeader('Content-type', 'application/json');
  let query = `SELECT * FROM category`;
  if (url.query.id) {
    query += ` WHERE id=${url.query.id}`;
    if (url.query.showDeleted != "1") {
      query += ` AND delete_at IS NULL`;
    }
  }
  connection.query(query, (error, result) => {
    if (error) {
      res.statusCode = 404;
      res.end("NOT FOUND" + error);
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify(result));
    }
  })
}

function deleteCategory(req, res, url, connection) {
  if (url.query.id) {
    let delete_at = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
    connection.query(`UPDATE category SET delete_at='${delete_at}' WHERE id=${url.query.id}`
      , (error, result) => {
        if (error) {
          console.log(error);
          res.statusCode = 500;
          res.end("SERVER ERROR");
        } else {
          res.statusCode = 200;
          res.end();
        }
      })
  } else {
    res.statusCode = 400;
    res.end("BAD REQUEST")
  }
}

function updateCategory(req, res, url, connection) {
  if (url.query.id) {
    let data = "";
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let task = JSON.parse(data);
      if (task.name) {
        task.update_at = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
        connection.query(`UPDATE category SET name='${task.name}', update_at='${task.update_at}' WHERE id=${url.query.id}`,
          (error, result) => {
            if (error) {
              console.log(error);
              res.statusCode = 500;
              res.end("SERVER ERROR.");
            } else {
              res.statusCode = 200;
              res.end();
            }

          });
        res.end();
      } else {
        res.statusCode = 400;
        res.end("BAD REQUEST");
      }
    });
  }
}


module.exports = {
  listCategories, addCategory, updateCategory, deleteCategory
}

let currentId = null;

function setupCurrentIdCategories(categories) {
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].id > currentId) {
      currentId = categories[i].id;
    }
  }
}

function addID(category) {
  currentId++;
  category.id = currentId;
}

function addTimestemp(category) {
  category.createdAt = +new Date();
  category.updatedAt = +new Date();
}

function addCategory(req, res, url, todos, categories, writeCATEGORYtoFile) {
  res.statusCode = 201;
  let data = "";
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    let category = JSON.parse(data);
    if (category.name) {
      addID(category);
      addTimestemp(category);
      categories.push(category);
      writeCATEGORYtoFile();
      res.end();
    } else {
      console.log("deu ruim")
      res.statusCode = 400;
      res.end("BAD REQUEST")
    }
  })
}

function listCategories(req, res, url, todos, categories) {
  res.setHeader('Content-type', 'application/json');
  if (url.query.id) {
    let category = findById(url.query.id, categories);
    if (category) {
      res.end(JSON.stringify(category));
    } else {
      res.statusCode = 404;
      res.end("BAD REQUEST");
    }
  } else {
    res.end(JSON.stringify(categories));
  }
}

function deleteCategory(req, res, url, todos, categories, writeCATEGORYtoFile) {
  if(url.query.id) {
    for (let i in categories) {
      if(categories[i].id == url.query.id) {
        categories[i].deletedAt += new Date();
        writeCATEGORYtoFile();
      }
    }
    res.end()
  } else {
    res.statusCode = 400;
    res.end("BAD REQUEST")
  }
}

function updateCategory(req, res, url, todos, categories, writeCATEGORYtoFile) {
  if(url.query.id){
    for(let i=0; i<categories.length; i++) {
      if(categories[i].id == url.query.id && !categories[i].deletedAt) {
        let data = "";
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            let category = JSON.parse(data);
            if (category.name) {
              category.id = categories[i].id;
              category.createdAt = categories[i].createdAt;
              category.updatedAt = +new Date();
              categories[i] = category;
              writeCATEGORYtoFile();
              res.end();
            } else {
              res.statusCode = 400;
              res.end("BAD REQUEST");
            }
        });
        return;
      }
    }
    res.statusCode = 404;
    res.end("NOT FOUND");
  } else {
    res.statusCode = 400;
    res.end("BAD REQUEST");
  }
}

module.exports = {
  listCategories, addCategory, updateCategory, deleteCategory, setupCurrentIdCategories
}

// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);


// Set some defaults
db.defaults({ todos: [] }).write();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.get("/todos",function(req,res){
    var q = req.query.q;
    var matchedTodos;
  
    var todosList = db.get("todos").value();
  
    if(q){
        matchedTodos = todosList.filter(function(todo){
          return todo.text.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
    }else{
        matchedTodos = todosList;
    }
    
  res.render("todos",{
    todosList:matchedTodos,
    q:q
  })
})

app.post("/todos/create", (req, res) => {
  db.get("todos")
    .push(req.body)
    .write();
  res.redirect("back");
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

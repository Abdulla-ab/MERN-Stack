const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/day.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(express.static("public"));

const todoList = [];
const workList = [];

app.get("/", (req, res) => {
  // get day
  let day = date.getDate();
  // render the template
  res.render("todo", {
    listTitle: day,
    List: todoList,
  });
});

app.get("/work", (req, res) => {
  res.render("todo", {
    listTitle: "Work List",
    List: workList,
  });
});

app.post("/", (req, res) => {
  if (req.body.list === "Work") {
    workList.push(req.body.newItem);
    res.redirect("/work");
  } else {
    todoList.push(req.body.newItem);
    res.redirect("/");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

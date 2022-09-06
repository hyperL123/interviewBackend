const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Pioneer471234512345",
  database: "user_info_table",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM user_info_table";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});
app.post("/api/post", (req, res) => {
  const { name, email, contact } = req.body;
  const sqlInsert =
    "INSERT INTO user_info_table (name,email,contact) VALUES (?, ?,?)";
  db.query(sqlInsert, [name, email, contact], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});
app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM user_info_table WHERE id=?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM user_info_table where id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const sqlUpdate =
    "UPDATE user_info_table SET name=?, email=?, contact=? WHERE id=?";
  db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// app.get("/", (req, res) => {
//   const sqlInsert =
//     "INSERT INTO user_info_table (name,email,contact) VALUES ('joh dse', 'johnewd@gmail.com',1231233444)";
//   db.query(sqlInsert, (err, result) => {
//     console.log(err);
//     console.log(result);
//     res.send("Hello");
//   });
// });
app.listen(5000, () => {
  console.log("Server is running on PORT 5000");
});

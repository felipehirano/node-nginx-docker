const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

const config = {
  host: "db", // É o nome do container/servico criado pelo docker-compose
  user: "root",
  password: "root",
  database: "nodedb",
};

app.get("/", (req, res) => {
  const connection = mysql.createConnection(config);
  const sql = `INSERT INTO people(name) values('Ken'),('Thiago'),('Lucas')`;
  connection.query(sql);

  connection.query(`SELECT * from people`, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(`<h1>NODEJS RUNNING!</h1>
                <ul>
                  <li>${results[0].name}</li>
                  <li>${results[1].name}</li>
                  <li>${results[2].name}</li>
                </ul>`);
  });

  connection.end();
});

app.listen(port, () => {
  console.log("Rodando na porta" + port);
});

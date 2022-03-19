const express = require('express')
const port = 3000
const app = express()
const Pool = require('pg').Pool
const fastcsv = require("fast-csv");
const fs = require("fs");
var FormData = require('form-data')
const ws = fs.createWriteStream("public/data.csv");
const axios = require('axios')
var cors = require('cors')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


app.use(cors())
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'market_academia_db',
  password: 'david2021',
  port: 5432,
})

app.get('/sendcsv', (req, res) => {
  pool.query('SELECT * FROM professor', (error, results) => {
    if (error) throw console.log("Error QUERY")
    saveCsv(results.rows)
    algorithm("http://localhost:3001/alg", res)        
  })
})

app.get('/students', (req, res) => {
  pool.query('SELECT * FROM student', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.get('/professors', (req, res) => {
  pool.query('SELECT * FROM professor', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.get('/courses', (req, res) => {
  pool.query('SELECT * FROM course', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.get('/tags', (req, res) => {
  pool.query('SELECT * FROM tag', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.get('/tagged', (req, res) => {
  pool.query('SELECT * FROM tagged', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.post('/login', jsonParser, (req, res) => {
  console.log(req.body)
  const type = req.body["CODIGO_LOGIN"]
  const username = req.body["USUARIO_LOGIN"]
  const password = req.body["CONTRASEÑA_LOGIN"]
  userValidation(type, username, password, res)
})

function userValidation(type, username, password, res) {
  if (type == 0) {
    pool.query('SELECT * \
    FROM student \
    WHERE mail =  $1\
    AND password = $2', [username, password], (error, results) => {
      if (error) throw error
      console.log(results.rows)
      res.send("201")
    })
  } else if (type == 1) {
    pool.query('SELECT * \
    FROM professor \
    WHERE mail =  $1\
    AND password = $2', [username, password], (error, results) => {
      if (error) throw error
      console.log(results.rows)
      res.send("202")
    })
  }
}

function saveCsv(data) {
  const jsonData = JSON.parse(JSON.stringify(data));
  fastcsv
    .write(jsonData, { headers: false })
    .on("finish", function () {
      console.log("Data info saved!");
    })
    .pipe(ws);
}

function algorithm(url, res) {
  let formData = new FormData();
  formData.append('csv', fs.createReadStream('public/data.csv'), (err) => {
    if (err) console.log("Error FILE")
  })
  axios.post(url, formData, {
    headers: formData.getHeaders()
  }).then(function (response) {
    res.send(response.data)
  }).catch(function (error) {
    res.send("Error AXIOS")
  })
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

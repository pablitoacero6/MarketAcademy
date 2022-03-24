const express = require('express')
const port = 4000
const app = express()
const Pool = require('pg').Pool
const fastcsv = require("fast-csv");
const fs = require("fs");
const concat = require("concat-stream")
var FormData = require('form-data')
const ws = fs.createWriteStream("public/data.cvs");
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
  password: '123',
  //password: 'david2021',
  port: 5432,
})

app.get('/sendcsv', (req, res) => {
  pool.query('SELECT * FROM professor', (error, results) => {
    if (error) throw console.log("Error QUERY")
    saveCsv(results.rows)
    //algorithm("http://127.0.0.1:8000/try", res)
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

app.post('/createStudent', jsonParser, (req, res) =>{  
  var id = req.body["ID_STUDENT"]
  var name = req.body["NAME_STUDENT"]
  var mail = req.body["MAIL_STUDENT"]
  var password = req.body["PASSWORD_STUDENT"]  
  pool.query("insert into student \
  values ($1, $2, $3, $4)",[id, name, mail, password] ,(error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.post('/createTeacher', jsonParser, (req, res) =>{  
  var id = req.body["ID_TEACHER"]
  var name = req.body["NAME_TEACHER"]
  var mail = req.body["MAIL_TEACHER"]
  var password = req.body["PASSWORD_TEACHER"]  
  var account = req.body["ACCOUNT_NUMBER"]
  pool.query("insert into professor(id, name, mail, password, account_number) \
  values ($1, $2, $3, $4, $5)",[id, name, mail, password, account] ,(error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.get('/lista', (req, res) => {
  var data = [{"id":1053175832,"name":"Jose Chaves","mail":"jose.chaves@gmail.com","password":"josechaves"},{"id":1052620306,"name":"Valentina Barrera","mail":"valentina.barrera@gmail.com","password":"valentinabarrera"},{"id":1053675814,"name":"Andres Chaves","mail":"andres.chaves@gmail.com","password":"andreschaves"},{"id":1054807890,"name":"Monica Hernandez","mail":"monica.hernandez@gmail.com","password":"monicahernandez"},{"id":1052545474,"name":"Juan Blanco","mail":"juan.blanco@gmail.com","password":"juanblanco"},{"id":1054726635,"name":"Paulo Caceres","mail":"paulo.caceres@gmail.com","password":"paulocaceres"},{"id":1054939393,"name":"Julian Nontiel","mail":"julian.nontiel@gmail.com","password":"juliannontiel"},{"id":1053650884,"name":"Jhon Nausan","mail":"jhon.nausan@gmail.com","password":"jhonnausan"},{"id":1052349868,"name":"Maria Morales","mail":"maria.morales@gmail.com","password":"mariamorales"},{"id":1054908112,"name":"Macarena Leal","mail":"macarena.leal@gmail.com","password":"macarenaleal"},{"id":1053787377,"name":"Edwin Cardona","mail":"edwin.cardona@gmail.com","password":"edwincardona"},{"id":1,"name":"Carro","mail":"carrocorreo","password":"validacion"},{"id":23213213,"name":"sdasda","mail":"dsadsad","password":"validacion"}]
  res.send(data)
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
    .write(jsonData, { headers: true })
    .on("finish", function () {
      console.log("Data info saved!");
    })
    .pipe(ws);
}

function algorithm(url, res) {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } }
  let formData = new FormData();
  formData.append('csv_rating', fs.createReadStream('public/data.cvs'), (err) => {
    if (err) console.log("Error FILE")
  })
  formData.pipe(concat(data => {
    axios.post(url, JSON.stringify(data), {
      headers: formData.getHeaders()
    })
      .then(function (response) {
        res.send(response.data)
      }).catch(function (error) {
        res.send(error)
      })
  }))
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

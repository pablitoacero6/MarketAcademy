const express = require('express')
const port = 4000
const app = express()
const Pool = require('pg').Pool
const fastcsv = require("fast-csv");
const fs = require("fs");
const concat = require("concat-stream")
var FormData = require('form-data')
const ws = fs.createWriteStream("public/rating.cvs");
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

app.get('/students', (req, res) => {
  pool.query('SELECT * FROM student', (error, results) => {
    if (error) throw error
    console.log("GET students")
    res.status(200).json(results.rows)
  })
})

app.get('/professors', (req, res) => {
  pool.query('SELECT * FROM professor', (error, results) => {
    if (error) throw error
    console.log("GET professors")
    res.status(200).json(results.rows)
  })
})

app.get('/courses', (req, res) => {
  pool.query('SELECT * FROM course', (error, results) => {
    if (error) throw error
    console.log("GET courses")
    res.status(200).json(results.rows)
  })
})

app.get('/tags', (req, res) => {
  pool.query('SELECT * FROM tag', (error, results) => {
    if (error) throw error
    console.log("GET tags")
    res.status(200).json(results.rows)
  })
})

app.get('/tagged', (req, res) => {
  pool.query('SELECT * FROM tagged', (error, results) => {
    if (error) throw error
    console.log("GET tagged")
    res.status(200).json(results.rows)
  })
})

app.get('/categories', (req, res) => {
  pool.query('SELECT * FROM category', (error, results) => {
    if (error) throw error
    console.log("GET categories")
    res.status(200).json(results.rows)
  })
})

app.post('/login', jsonParser, (req, res) => {
  const type = req.body["CODIGO_LOGIN"]
  const id = req.body["USUARIO_LOGIN"]
  const password = req.body["CONTRASEÑA_LOGIN"]
  userValidation(type, id, password, res)
  console.log("POST login")
})


app.post('/recommended', jsonParser, (req, res) => {
  var url = "http://127.0.0.1:8000/alg/?user=" + req.body["userId"]
  pool.query('select * from historical', (error, results) => {
    if (error) throw console.log("Error QUERY")
    saveCsv(results.rows)
    algorithm(url, res)
  })
  console.log("POST recommended")
})

app.post('/createStudent', jsonParser, (req, res) => {
  var id = req.body["ID_STUDENT"]
  var name = req.body["NAME_STUDENT"]
  var mail = req.body["MAIL_STUDENT"]
  var password = req.body["PASSWORD_STUDENT"]
  pool.query("insert into student \
  values ($1, $2, $3, $4)", [id, name, mail, password], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
  console.log("POST crStudent")
})

app.post('/createTeacher', jsonParser, (req, res) => {
  var id = req.body["ID_TEACHER"]
  var name = req.body["NAME_TEACHER"]
  var mail = req.body["MAIL_TEACHER"]
  var password = req.body["PASSWORD_TEACHER"]
  var account = req.body["ACCOUNT_NUMBER"]
  pool.query("insert into professor(id, name, mail, password, account_number) \
  values ($1, $2, $3, $4, $5)", [id, name, mail, password, account], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
  console.log("POST crProfessor")
})

app.post('/createCourse', jsonParser, (req, res) => {
  console.log(req.body)
  var title = req.body["TITLE"]
  var price = req.body["PRICE"]
  var level = req.body["LEVEL"]
  var professor = req.body["PROFESSOR"]
  var category = req.body["CATEGORY"]
  var img = req.body["IMG"]
  var duration = req.body["DURATION"]
  var description = req.body["DESCRIPTION"]
  pool.query("insert into course(title, price, id_level, id_professor, id_category, img, duration, description) \
  values ($1, $2, $3, $4, $5, $6, $7, $8)", [title, price, level, professor, category, img, duration, description], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
  console.log("POST crCourse")
})

app.post('/register', jsonParser, (req, res) => {
  console.log(req.body)
  var id_student = req.body["ID_STUDENT"]
  var id_course = req.body["ID_COURSE"]
  var status = "matriculado"
  pool.query("insert into register \
  values($1, $2, $3)", [id_student, id_course, status], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
  console.log("POST crRegister")
})

app.post('/search', jsonParser, (req, res) => {
  var search = req.body["SEARCH"]
  pool.query(`SELECT * \
  FROM course \
  WHERE title LIKE \'%${search}%\' \
  ORDER BY calification DESC`, (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
  console.log("POST search")
})

app.post('/coursesProfessor', jsonParser, (req, res) => {
  var id = req.body["ID_PROFESSOR"]
  pool.query("SELECT * FROM course WHERE id_professor = $1", [id], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
  console.log("POST coursesProfessor")
})

app.post('/coursesStudent', jsonParser, (req, res) => {
  var id = req.body["ID_STUDENT"]
  pool.query("SELECT * FROM course, register \
  WHERE id_course = id  \
  and id_student = $1", [id], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
  console.log("POST coursesStudent")
})

app.post('/endCourse', jsonParser, (req, res) => {
  console.log(req.body)
  var id_student = req.body["ID_STUDENT"]
  var id_course = req.body["ID_COURSE"]
  var calification = req.body["CALIFICATION"]
  pool.query("INSERT INTO historical(id_student, id_course, calification) \
  values ($1, $2, $3)", [id_student, id_course, calification], (error, results) => {
    if (error) throw error
  })
  pool.query("delete from register \
  where id_student = $1 \
  and id_course = $2", [id_student, id_course], (error, results) => {
    if (error) throw error
  })
  res.sendStatus(200)
  console.log("POST endCourse")
})

app.post('/historicalStudent', jsonParser, (req, res) => {
  var id = req.body["ID_STUDENT"]
  pool.query("select * \
  from course, historical \
  where id_course = id \
  and id_student = $1", [id], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
  console.log("POST historicalStudent")
})

function userValidation(type, id, password, res) {
  if (type == 0) {
    pool.query('SELECT * \
    FROM student \
    WHERE id =  $1', [id], (error, results) => {
      if (error) throw error
      if (results.rows.length == 0) {
        res.send("0")
      } else {
        if (results.rows[0]["password"] == password) {
          res.send("200")
        } else {
          res.send("1")
        }
      }
    })
  } else if (type == 1) {
    pool.query('SELECT * \
    FROM professor \
    WHERE id =  $1', [id], (error, results) => {
      if (error) throw error
      if (results.rows.length == 0) {
        res.send("0")
      } else {
        if (results.rows[0]["password"] == password) {
          res.send("201")
        } else {
          res.send("1")
        }
      }
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
  axios.get(url)
    .then(function (response) {
      var values = ""
      for (var i = 0; i < response.data.cursos_id.length; i++) {
        if (i == response.data.cursos_id.length - 1) {
          values += " "+(response.data.cursos_id[i].id)
        } else {
          values += " "+(response.data.cursos_id[i].id + ",")
        }
      }
      pool.query(`SELECT * FROM course WHERE id in (${values})`, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
      })
    }).catch(function (error) {
      res.send(error)
    })
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

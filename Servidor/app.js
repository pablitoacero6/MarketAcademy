const express = require('express')
const port = 3000
const app = express()
const Pool = require('pg').Pool
var cors = require('cors')
var bodyParser = require('body-parser')

app.use(cors())

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'marketacademiadb',
    password: 'david2021',
    port: 5432,
  })

  app.get('/', (req,res) =>{
    res.json({name:'David', age:'22'})
  })

  app.get('/database', (req,res) =>{
    pool.query('SELECT name FROM student', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)    
      })
  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  
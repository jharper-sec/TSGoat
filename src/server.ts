import express = require('express')
import bodyParser = require('body-parser')
import { searchUsers } from "./database"

const app = express()
const port = 3000

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (_req, res) => {
  res.render('index', {
    title: 'Users',
    users: [],
  })
})

app.post('/', (req, res) => {
  searchUsers(req.body.search).then((data) => {
    res.render('index', {
      title: 'Users',
      users: data,
    })
  }).catch(_e => {
    res.render('index', {
      title: 'Users',
      users: [],
    })
  })
})

app.listen(port, () => console.log('Server started on port: ' + port))


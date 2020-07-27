import sqlite3 = require('sqlite3')
import fs = require('fs')

const db = new sqlite3.Database(':memory:')

createTable()

export { searchUsers as searchUsers}

function searchUsers(query: string) {
    return new Promise((resolve, reject) => {
      // SQL Injection Vulnerability
      db.all("SELECT * FROM users WHERE first_name LIKE '%" + query + "%' AND admin == 'false'", (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
      })
    })
  }
  
  function createTable() {
    db.serialize(() => {
      db.run("DROP TABLE IF EXISTS users")
      db.run("CREATE TABLE users (first_name TEXT, last_name TEXT, company TEXT, title TEXT, email TEXT, phone TEXT, dob TEXT, ssn TEXT, salary NUMERIC, admin BOOLEAN)")
      var inserts = db.prepare("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
      
      var rawdata = fs.readFileSync('user_seed_data.json');
      var users = JSON.parse(rawdata.toString());
      
      users.forEach((usr: { first_name: any; last_name: any; company: any; title: any; email: any; phone: any; dob: any; ssn: any; salary: any; admin: any }) => {
        inserts.run(usr.first_name, usr.last_name, usr.company, usr.title, usr.email, usr.phone, usr.dob, usr.ssn, usr.salary, usr.admin)
      })
      inserts.finalize()
    })
  }

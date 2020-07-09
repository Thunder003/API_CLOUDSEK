const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'aditya',
    password : '',
    database : 'cloudSEK'
  }
});

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
          	 res.json(user[0])
          })
          .catch(err => res.status(403).json('unable to get user'))
      } else {
        res.status(403).json('wrong credentials')
      }
    })
    .catch(err => res.status(403).json('wrong credentials'))
})

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')	
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0]
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(403).json('Not able to register'))
})

app.get('/see_remaining_limits', (req, res) => {
  const { id } = req.params;
  db.select('remain').from('users').where({id})
    .then(remain => {
    		res.json(remain[0])
    })
    .catch(err => res.status(403).json('error seeing limits'))
})

app.get('/call_api', (req, res) => {
  const { id } = req.body;
  db.select('entries').from('users').where('id', '=', id)
  .then(entries => {
      if (entries[0]<'5') {
      	db('users').where('id', '=', id).increment('entries', 1)
        res.json(Math.random())
      } else {
        res.status(403).json('Limit Exceed')
      }
    })
  .catch(err => res.status(403).json('unable to call'))
})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})
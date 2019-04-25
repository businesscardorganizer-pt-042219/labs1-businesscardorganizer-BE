const express = require('express')
const knex = require('knex')
const helmet = require('helmet')
const cors = require('cors')

const server = express(); 

const dbConfig = require('../knexfile')
const db = knex(dbConfig.development)
server.use(express.json(), helmet(), cors())
server.get('/', (req, res) => {
res.status(200).send("It works!")
})
//GET endpoints
//GET all
 server.get('/api/cards', (req, res) => { 
    db('cards').then( cards => {
        res.status(200).json(cards)
    })
    .catch( err => { res.status(400).json({err: "we've encountered an error"})
    })
  })
//GET by id
  server.get('/api/cards/:id', (req, res) => {
    const {id} = req.params
    db('cards').where({id}).then(content => {
        res.status(200).json(content)
    })
    .catch(err => { res.status(400).json({ err: "There was an error locating the card"})
  })
})
//POST card
   server.post('/api/cards', (req, res) => { 
      const body = req.body
      db('cards').insert(body).then(id => {
          res.status(201).json(id)
      })
      .catch( err => { res.status(400).json({err: "Unable to post card"})})
  })
//DELETE Card
  server.delete('/api/cards/:id', (req, res) => {
    const {id} = req.params
    db('cards').where({id}).del().then( ids => {
        res.status(200).json(ids)
    })
    .catch( err => { res.status(400).json({ err: "Unable to delete the card"})
  })
})
//PUT card
server.put('/api/cards/:id', (req, res) => {
    const {id} = req.params
    const body = req.body
 
    return db('cards').where({id}).first().update('cards', body).then(content => {
          res.status(201).json(content)
      })   
      .catch(err => {res.status(400).json({err: "Unable to edit the card"})
    })
})

 module.exports = {
    server
}

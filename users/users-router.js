
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../data/dbConfig.js');
const Users = require('../users/users-model.js');
const { jwtSecret } = require('../config/secret.js');

const router = require('express').Router();


const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

//GET user's own card
router.get('/usersowncard/:id', (req, res) => {
  const {id} = req.params

  db.select('cards.id')
.from('cards')
.innerJoin('collections','collections.card_id','cards.id')
.innerJoin('users','users.id','collections.user_id')
.where('users.id', `${id}`)
.where('cards.own_flag', '1')
.then(content => {
      res.status(200).json(content)
  })
  .catch(err => { res.status(400).json({ err: "This is not your card or you don't have one!"})
})
})


//GET user cards
router.get('/userscards/:id', (req, res) => {
  const {id} = req.params

  db.select('cards.id')
.from('cards')
.innerJoin('collections','collections.card_id','cards.id')
.innerJoin('users','users.id','collections.user_id')
.where('users.id', `${id}`)
.then(content => {
      res.status(200).json(content)
  })
  .catch(err => { res.status(400).json({ err: "There was an error locating the card"})
})
})
//GET endpoints
//GET all
router.get('/cards', (req, res) => { 
  db('cards').then( cards => {
      res.status(200).json(cards)
  })
  .catch( err => { res.status(400).json({err: "we've encountered an error"})
  })
})
//GET by id
router.get('/cards/:id', (req, res) => {
  const {id} = req.params
  db('cards').where({id}).then(content => {
      res.status(200).json(content)
  })
  .catch(err => { res.status(400).json({ err: "There was an error locating the card"})
})
})
//POST card
 router.post('/cards', (req, res) => { 
    const body = req.body
    db('cards').insert(body).then(id => {
        res.status(201).json(body)
    })
    .catch( err => { res.status(400).json({err: "Unable to post card"})})
})
//DELETE Card
router.delete('/cards/:id', (req, res) => {
  const {id} = req.params
  db('cards').where({id}).del().then( ids => {
      res.status(200).json({message: "the card has been deleted"})
  })
  .catch( err => { res.status(400).json({ err: "Unable to delete the card"})
})
})
//PUT card
router.put('/cards/:id', (req, res) => {
  const {id} = req.params
  const body = req.body

  return db('cards').where({id}).first().update('cards', body).then(content => {
        res.status(201).json(content)
    })   
    .catch(err => {res.status(400).json({err: "Unable to edit the card"})
  })
})

module.exports = router;

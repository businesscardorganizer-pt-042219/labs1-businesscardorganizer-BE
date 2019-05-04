
const db = require('../data/dbConfig.js');
const Users = require('../users/users-model.js');
const router = require('express').Router();
const route = require('../auth/routes.js')

const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});


//GET user's own card
router.get('/mycard/:id', restricted, (req, res) => {
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


//GET user cards /user.idmy
router.get('/mycards/:id', restricted, (req, res) => {
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
router.get('/cards', restricted, (req, res) => { 
  db('cards').then( cards => {
      res.status(200).json(cards)
  })
  .catch( err => { res.status(400).json({err: "we've encountered an error"})
  })
})
//GET by id
router.get('/cards/:id', restricted, (req, res) => {
  const {id} = req.params
  db('cards').where({id}).then(content => {
      res.status(200).json(content)
  })
  .catch(err => { res.status(400).json({ err: "There was an error locating the card"})
})
})
//POST card
 router.post('/cards', restricted, (req, res) => { 
    const body = req.body
    db('cards').insert(body).then(id => {
        res.status(201).json(id)
    })
    .catch( err => { res.status(400).json({err: "Unable to post card"})})
})





//DELETE Card
router.delete('/cards/:id', restricted, (req, res) => {
  const {id} = req.params
  db('cards').where({id}).del().then( id => {
      res.json({message:"The has been deleted"})
      
  })
  .catch( err => { res.status(400).json({ err: "Unable to delete the card"})
})
})
//PUT card
router.put('/cards/:id', restricted, (req, res) => {
  const {id} = req.params
  const body = req.body


console.log('Body:', body);
  return db('cards').where({id}).update(body).then(content => {
        res.status(201).json(content)
    })   
    .catch(err => {
      console.error(err);
      res.status(400).json({err: "Unable to edit the card"})
  })
})



//GET all
router.get('/events', restricted, (req, res) => { 
  db('events').then( event => {
      res.status(200).json(event)
  })
  .catch( err => { res.status(400).json({err: "we've encountered an error"})
  })
})

//POST post event

router.post('/events', restricted, (req, res) => { 
  const body = req.body
  db('events').insert(body).then(id => {
      res.status(201).json(id)
  })
  .catch( err => { res.status(400).json({err: "Unable to post event"})})
})
 


//GET user cards by event id
//events/id is event's id
router.get('/events/:id', restricted, (req, res) => {
  const {id} = req.params

  db.select('cards.initial', 'cards.id', 'cards.first_name', 'cards.last_name','cards.work_title', 'cards.email','cards.address1','cards.address2','cards.city','cards.state','cards.zip','cards.country','cards.company_name','cards.cell_phone','cards.work_phone','cards.URL','cards.QR_code','cards.github','cards.linkedIn','cards.own_flag')
.from('cards')
.innerJoin('collections','collections.card_id','cards.id')
.innerJoin('users','users.id','collections.user_id')
.innerJoin('events','events.id','collections.event_id')
.where('events.id', `${id}`)

.then(content => {
      res.status(200).json(content)
  })
  .catch(err => { res.status(400).json({ err: "There was an error locating the card"})
})
})


//POST card to event
router.post('/editcardtoevent/:id/:card_id/:event_id', restricted, (req, res) => { 

  db('collections').insert({user_id: req.params.id, card_id: req.params.card_id, event_id: req.params.event_id}).then(id => {
      res.status(201).json(id)
    //  console.log(global.userz)
  })
  .catch( err => { res.status(400).json({err: "Unable to post card"})})
})


//collection


module.exports = router;

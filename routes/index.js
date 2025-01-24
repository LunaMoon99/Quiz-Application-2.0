const express = require('express');
const path = require('path');
const { getCollection, connectToDB } = require('../models/db');

const router = express.Router();
const server = express();

server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));

var arrayofscores = [];
// Added by Sulaiman
let currentUser = "";

router.get('/', function(req, res, next) {
  res.redirect('/home');
});

router.get('/home', function(req, res) {
  // Audio code still in work

  // let myAudio = document.querySelector('#audio')
  // let button = document.querySelector('#sound');

  // button.addEventListener('click', () => {
  //     myAudio.play();
  // });
  res.render('home');
});

router.get('/signin', function(req, res, next) {
  const error = req.query.error || null; // Get the error message from the query string
  res.render('signin', { error }); // Pass the error message to the template
  //res.render('signin');
});

router.get('/signup', function(req, res, next) {
  const error = req.query.error || null; // Get the error message from the query string
  res.render('signup', { error }); // Pass the error message to the template
  //res.render('signup');
});

router.get('/game', (req, res) => {
  res.render('game');
});

router.get('/results', function(req, res) {
  res.render('results');
});

router.get('/profile', function(req, res) {
  res.render('profile');
});

router.post('/signup/submit', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // Added by Sulaiman
  const newUser = {
    email: email,
    name: name, 
    password: password,
    scores: []
  }
  arrayofscores = newUser.scores;

  try{
    const conn = await getCollection('users');
    const existingUser = await conn.findOne({ email });
    if (existingUser){
      return res.redirect('/signin?error=Your email is already in our system, please sign in');
      //return res.redirect('/signin');
    }

    await conn.insertOne(req.body);
    // Added by Sulaiman
    currentUser = email;
    res.redirect('/game');

  } catch(e) {
    //console.log(`This is the error in the /signup/submit ${e}`);
    res.redirect('/signup?error=An error occurred. Please try again.');
  }
});

router.post('/signin/submit', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //console.log(`password: ${password} and email: ${email}`);
  try{
    const conn = await getCollection('users');
    //await conn.findOne();
    const user = await conn.findOne({ email, password });
    if (user) {
      // Added by Sulaiman
      currentUser = email;
      arrayofscores = user.scores;
      res.redirect('/game');
    } else {

      //console.log('Invalid email or password.');
      //res.redirect('/signin');
      res.redirect('/signin?error=Invalid email or password, please try again or sign up instead');
    }
  } 
  catch(e) {
    console.log(`This is the error in the /signin/submit ${e}`);
    //res.redirect('/signin');
    res.redirect('/signin?error=An error occurred. Please try again.');
  }
});

// user and scores
 function getUser() {
   return {
     currentUser, arrayofscores
   };
 }

module.exports = router;

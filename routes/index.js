const express = require('express');
const path = require('path');
const { getCollection, connectToDB } = require('../models/db');

const router = express.Router();
const server = express();

server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));

var arrayofscores = [];

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
  res.render('signin');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
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
  try{
    const conn = await getCollection('users');
    const existingUser = await conn.findOne({ email });
    if (existingUser){
      return res.redirect('/signin');
    }

    await conn.insertOne(req.body);

    res.redirect('/game');

  } catch(e) {
    console.log(`This is the error in the /signup/submit ${e}`);
    res.redirect('/signup');
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
      res.redirect('/game');
    } else {
      console.log('Invalid email or password.');
      res.redirect('/signin');
    }
  } 
  catch(e) {
    console.log(`This is the error in the /signin/submit ${e}`);
    res.redirect('/signin');
  }
});

module.exports = router;
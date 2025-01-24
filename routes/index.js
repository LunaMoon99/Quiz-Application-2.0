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
let currentuser = "";

router.get('/', function(req, res) {
  res.render('home', {
    currentuser
  });
});

router.get('/home', function(req, res) {
  res.render('home', {
    currentuser
  });
});

router.get('/signin', function(req, res) {
  const error = req.query.error || null; // Get the error message from the query string
  res.render('signin', { error }); // Pass the error message to the template
});

router.get('/signup', function(req, res) {
  const error = req.query.error || null; // Get the error message from the query string
  res.render('signup', { error }); // Pass the error message to the template
});

router.get('/game', function(req, res) {
  res.render('game');
});

router.get('/results', async (req, res) => {
  try {
    const conn = await getCollection(process.env.COLLECTION);
    const score = parseInt(req.query.score, 10); // Extract the score from the query string

    if (!isNaN(score)) {
      arrayofscores.push(score); // Add the score to the array
      await conn.updateOne(
        { name: currentuser }, // Find the user by their name
        { $push: { scores: score } } // Push the new score to the 'scores' array
      );
    }

    const getfeedback = (score) => {
      if (score >= 80) return "Excellent job!";
      if (score >= 50) return "Good effort, keep practicing!";
      return "Keep trying! Practice makes perfect.";
    };

    const feedback = getfeedback(score); // Pass the score into the feedback function

    res.render('results', { currentuser, score, feedback }); // Pass the data to the results page  
  } catch (e) {
    console.error("Error fetching results:", e);
    res.redirect('/results?error=An error occurred. Please try again.');
  }
});

router.get('/profile', async (req, res) => {
  try {
    const conn = await getCollection(process.env.COLLECTION); // Get the 'users' collection

    // Fetch the current user's document from the database
    const user = await conn.findOne({ name: currentuser }); // Query by the current user's name

    // If the user exists, retrieve their scores
    const userscores = user ? user.scores : []; // Default to an empty array if the user doesn't exist

    // Render the profile page, passing the scores from the database
    res.render('profile', {
      arrayofscores: userscores,
      currentuser: currentuser,
    });
  } catch (e) {
    console.error(`Error fetching profile data: ${e}`);
    res.redirect('/home?error=An error occurred while fetching your profile data.');
  }
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
  arrayofscores = newuser.scores;

  try{
    const conn = await getCollection(process.env.COLLECTION);
    const existinguser = await conn.findOne({ email });
    if (existinguser){
      return res.redirect('/signin?error=Your email is already in our system, please sign in');
    }

    await conn.insertOne(newuser);
    req.user = newuser;
    currentuser = name;
    res.redirect('/game');

  } catch(e) {
    res.redirect('/signup?error=An error occurred. Please try again.');
  }
});

router.post('/signin/submit', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try{
    const conn = await getCollection(process.env.COLLECTION);
    const user = await conn.findOne({ email, password });
    if (user) {
      currentuser = user.name;
      arrayofscores = user.scores;
      req.user = user;
      res.redirect('/game');
    } else {

      res.redirect('/signin?error=Invalid email or password, please try again or sign up instead');
    }
  } 
  catch(e) {
    res.redirect('/signin?error=An error occurred. Please try again.');
  }
});

module.exports = router;

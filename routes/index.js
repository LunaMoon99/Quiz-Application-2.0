const express = require('express');
const path = require('path');
const { getCollection, connectToDB } = require('../models/db');

const router = express.Router();
const server = express();

server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));

var arrayofscores = [];
let currentuser = "";

router.get('/', function(req, res) {
  res.render('home', {
    currentuser
  });
  //res.redirect('/home');
});

router.get('/home', function(req, res) {
  res.render('home', {
    currentuser
  });
  //res.render('home');
});

router.get('/signin', function(req, res) {
  const error = req.query.error || null; // Get the error message from the query string
  res.render('signin', { error }); // Pass the error message to the template
  //res.render('signin');
});

router.get('/signup', function(req, res) {
  const error = req.query.error || null; // Get the error message from the query string
  res.render('signup', { error }); // Pass the error message to the template
  //res.render('signup');
});

router.get('/game', (req, res) => {
  res.render('game');
});

// router.post('/results', async (req, res) => {
//   if (!req.user) {
//     // If no user is logged in, redirect to the sign-in page
//     return res.redirect('/signin?error=You are not logged in, please sign in');
//   }
//   currentuserejs = req.user.name;
//   const currentuser = req.user.name;
//   const score = req.query.score || 0;

//   try {
//     const conn = await getCollection('users');
//     const user = await conn.findOne({ name: currentuser });

//     const feedback = (score) => {
//       if (score >= 80) return "Excellent job!";
//       if (score >= 50) return "Good effort, keep practicing!";
//       return "Keep trying! Practice makes perfect.";
//     };
    
//     const userFeedback = feedback(score);

//     res.render('results', { currentuser, score, feedback: userFeedback });
//   } catch (e) {
//     res.redirect('/results?error=An error occurred. Please try again.');
//   }
  // Access currentuser from req.user
  //const currentuser = req.user.name;

  //res.render('profile', { currentuser });
//});



router.get('/results', async(req, res) => {
  //currentuser = req.user.name || null; // Example logic
  if (!req.user) {
        // If no user is logged in, redirect to the sign-in page
        return res.redirect('/signin?error=You are not logged in, please sign in');
  }
  try{
    const conn = await getCollection('users');
    //const score = parseInt(req.query.score, 10); // Extract the score from the query string
    
  
    if (!isNaN(score)) {
      arrayofscores.push(score); // Add the score to the array
      await conn.updateOne(
        { name: currentuser }, // Filter: find the user by their name
        { $push: { scores: score } } // Update: push the new score to the 'scores' array
      );
    }
    const getfeedback = (score) => {
      if (score >= 80) return "Excellent job!";
      if (score >= 50) return "Good effort, keep practicing!";
      return "Keep trying! Practice makes perfect.";
    };
    feedback = getfeedback()
    res.render('results', { currentuser, score, feedback }); // Pass the data to the results page  

  } catch(e) {
    res.redirect('/results?error=An error occurred. Please try again.');
  }

 });

// router.post('/results', async (req, res) => {
//   try {
//       const conn = await getCollection('users');
//       const { score } = req.body; // Get the score from the request body

//       // Find the user and update their scores
//       const user = await conn.findOne({ name: currentuser }); // or use another user identifier like email
//       if (user) {
//           await conn.updateOne(
//               { name: currentuser }, // Find the user by name (adjust if needed)
//               { $push: { scores: score } } // Push the new score into the user's scores array
//           );
//       }

//       res.json({ message: 'Score saved successfully!' }); // Send a response back
//   } catch (e) {
//       console.error(`Error saving score: ${e}`);
//       res.status(500).json({ error: 'An error occurred. Please try again.' });
//   }
// });


router.get('/profile', async (req, res) => {
  try {
    const conn = await getCollection('users'); // Get the 'users' collection

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

// router.get('/profile', async (req, res) => {
//   if (!req.user) {
//     return res.redirect('/signin'); // Redirect if no user is logged in
//   }
//   currentuserejs = req.user.name;
//   const currentuser = req.user.name;

//   try {
//     const conn = await getCollection('users');
//     const user = await conn.findOne({ name: currentuser });

//     const userscores = user ? user.scores : [];

//     res.render('profile', { arrayofscores: userscores, currentuser: currentuser });
//   } catch (e) {
//     res.redirect('/home?error=An error occurred while fetching your profile data.');
//   }
// });


router.get('/game', async (req, res) => {
  if (!req.user) {
    // If no user is logged in, redirect to the sign-in page
    return res.redirect('/signin?error=You are not logged in, please sign in');
  }

  // Access currentuser from req.user
  const currentuser = req.user.name;

  res.render('game', { currentuser });
});




router.post('/signup/submit', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const newuser = {
    email: email,
    name: name, 
    password: password,
    scores: []
  }
  arrayofscores = newUser.scores;

  try{
    const conn = await getCollection('users');
    const existinguser = await conn.findOne({ email });
    if (existinguser){
      return res.redirect('/signin?error=Your email is already in our system, please sign in');
      //return res.redirect('/signin');
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
  //console.log(`password: ${password} and email: ${email}`);
  try{
    const conn = await getCollection('users');
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

function getUser() {
  return {
    currentuser, arrayofscores
  };
}

module.exports = router;
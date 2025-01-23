var express = require("express");
const path = require("path");
var router = express.Router();
//const fs = require("fs");
//const fetch = require("node-fetch");
const server = express();
server.use(express.static('public'));
var arrayofscores = [];
const { getCollection, connectToDB } = require('../models/db');

// const port = 3500;
// const server = express();



// function readUserDB() {
//     let data = fs.readFileSync(userDBFileName, "utf-8");
//     return JSON.parse(data);
// }

// function writeUserDB(users){
//     let data = JSON.stringify(users, null, 2);
//     fs.writeFileSync(userDBFileName, data, "utf-8");
// }

router.get('/', function(req, res, next) {
  res.redirect("/home");
});

router.get('/home', function(req, res) {
  // Audio code still in work

  // let myAudio = document.querySelector('#audio')
  // let button = document.querySelector("#sound");

  // button.addEventListener("click", () => {
  //     myAudio.play();
  // });
  res.render('home');
});

router.get('/signin', function(req, res, next) {
  res.render("signin");
});

router.get('/signup', function(req, res, next) {
  res.render("signup");
});

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('home');
// });


router.get("/game", (req, res) => {
  res.render("game"); 
});

router.get('/results', function(req, res) {
  res.render('results');
});

router.get('/profile', function(req, res) {
  res.render('profile');
});

// router.post("/signin/submit", (req, res) => {
//   //let userDB = readUserDB();

//   const email = req.body.email;
//   const password = req.body.password;

//   let user = false;
//   for(let i = 0; i < userDB.length; i++){
//       if ((email === userDB[i].email) && (password === userDB[i].password)){
//           console.log("User exists in database, now loading game page");
//           user = true;
//           res.redirect('/game');
//           //res.redirect("/Game/game.html");
//           break;
//       }
//       else if ((email === userDB[i].email) && (password !== userDB[i].password)){
//           console.log("User exists in database, but password is incorrect");
//           //alert("Your password was incorrect, please try again");
//       }
//   }

//   if (!user){
//       console.log("user not in database, going to signup");
//       //alert("Your email is not registered in our database, please sign up");
//       res.redirect('/signup');
//       //res.redirect("/Signin/signin.html");
//   }
// });

router.post("/signup/submit", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  //const conn = getCollection("users");
  try{
    //const conn = getCollection("users");
    const conn = getCollection("users");


    const existingUser = await conn.findOne({ email: email });
    if (existingUser){
      return res.render("/signin");
    }

    await conn.insertOne(req.body);
    res.render("/game");

  } catch(e) {
    console.log(`This is the error in the /signup/submit ${e}`);
  }
});

router.post("/signin/submit", async (req, res) => {
  const conn = getCollection("users");
  try{
    await conn.findOne();
    let email = req.body.email;
    let password = req.body.password;
    //console.log("found one matching user");
    //res.render('index');
    //const email = conn.findOne({ id: email, id: password }).exec();
    //const password = conn.findOne({ id: password }).exec();
    console.log(`password: ${password} and email: ${email}`);
  } 
  catch(e) {
    console.log(`This is the error in the /signin/submit ${e}`);
  }
  res.redirect('/game');
});





    

// server.listen(port, () => {
//     console.log(`Express listening on port ${port}`);
// })
module.exports = router;
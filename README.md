# ThinkStorm - A Quiz Application to Help Build Full Stack Knowledge

## Overview

Hey there! Welcome to ThinkStorm! This is a collaborative project where we use HTML/CSS and JavaScript (Node.js) to design and create a beginner full stack project. This project entails a quiz application which randomly choose questions (through the use of a quiz API) and outputs them for the users to answer in a timed situation. Afterwards, the user will get a score of how many they got correct. Additionally, the user will also have access to their profile where they can also see past scores from past quizzes they have taken!

With regards to technologies used, we currently have HTML/CSS for the frontend and Express.JS for the backend and for running the server. While for the database in order to store the users we make use of MongoDB through Express.js. Alongside this, we have used technologies such as BootStrap and CHATGPT to obtain and refine various portions of the code.

## Features

- Choosing questions from a general knowledge api which features questions from various topics and varying difficulties
- Having a custom timer for the questions
- Using a signup/signin page to keep track of users as well as tracking their past and current scores (storing it all in MongoDB)

## How to Access and Run the Server

To access the code, these steps can be used (Note, to access the code VS Code is recommended):

1. On the Github Repository first go under the Code Tab
2. Click on the blue Code button and in the dropdown click on "Download Zip"
3. Once the Zip file downloads, extract all the items from the folder and connect to an IDE to run! (Steps for VS Code continued below!)

To run the server on VS Code:

1. Once the contents of the Zip File have been extracted in VS Code make sure everything looks good
2. Run 'npm install' to install all required packages
3. To make sure that MongoDB works, make a '.env' file that contains this line:
4.      ATLAS_URI="mongodb+srv://<YOUR_USERNAME>:<YOUR_DB_PASSWORD>@cluster0.lcx9a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
5. Replace <YOUR_USERNAME> and <YOUR_DB_PASSWORD> according to your personal username and database password
6. Make sure that your cluster name is also 'Cluster0', otherwise go to MongoDB make/view your cluster: click connect, then drivers, and turn off the view code              sample and copy and paste the connection string that appears there and follow step 5 above
7. If you want to be able to see if MongoDB is running on your server, make sure to add these two lines in your '.env' file:
8.      DATABASE="<DATABASE_NAME>"
9.      COLLECTION="<COLLECTION_NAME>"
10. Make sure the database name and collection name match what is in your corresponding cluster
11. Once everything installs, in the terminal of VS code, run either 'nodemon app.js' or 'nodemon start' depending on which on works
12. Once it is running, go to your favored browser and type "LocalHost:3500" in the url
13. Then the page should be running! Enjoy!

## Team Contributions/Challenges

Our team is made up of four aspiring computer scientists, and we each had our respective roles in this project.

- Sulaiman Alam: Focused on the coding of the home page, signup page, and signin page. Also worked on the app.js page to enable the server running and the sharing of data.
- Paulo Criollo: Focused on the game page of the application and coding the system that randomly retrieve questions from the OpenTrivia API and gets dynamically displayed to the user to answer.
- Jenny Zheng: Focused implementing the server, ejs files, expressjs and mongodb. Refactored our previous quiz application code into a format that is able to use the aformentioned newly added features.
- Anjiya Shrestha: Focused on the profile page of the application, and coding the welcoming user with username and showing past game scores.

## Next Steps

Building upon our first version of this project, we have made a lot of steps in the forward direction. Firstly, we have improved the backend of the server to use Express.js to streamline the process. Additionally, we have included the use of an API to retrieve the questions from removing the need hard coded questions.

To build upon this, we hope to use further technologies such as React to streamline the front end of the application as well as further knowledge of databases to improve the storage of users and their scores. Additionally, we hope to use technologies that will allow users to have a session in the game however long they are signed in for.

We hope that this project helps to not only build upon our current knowledge in front end programming, but also in creating avenues to explore various aspects of the field. Inspiring us to not only keep working, but also with the hope that it inspires other students in computer science to build these types of projects!

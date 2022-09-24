// Require Express to run server and routes
const express = require('express');
const app = express();

// middleWars
const cors = require('cors');
// Enable All CORS Requests
app.use(cors());

//body-parser allow the backend to access JSON data sent from the client using request.body in POST route handler.
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json());
// Initialize the main project folder
app.use(express.static('website'));

// Setup empty JS object to act as endpoint for all routes
porjectData = {};
// Callback function to complete GET '/all'
const getData = (req,res)=>{
  res.status(200).send(porjectData);
}
// GET route
app.get('/all',getData);
// Callback function to complete POST '/add'
const postData = (req,res)=>{
  porjectData = req.body;
  console.log(porjectData);
  res.status(200).send(porjectData);
}
// POST route
app.post('/add',postData);

// port
const port = 5000;

// function to test the server 
const listening = ()=>{
  console.log('server is running at port : ' + port )
}
// spin up the server
app.listen(port,listening);

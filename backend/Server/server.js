import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

//Important Notes at the end

//Import Routes
import usersRouter from './routes/users.js';
import mealsRouter from './routes/meals.js';
import foodsRouter from './routes/foods.js';

//ENV
import dotenv from 'dotenv';
dotenv.config()


const port = process.env.port || 5000;
const uri = process.env.ATLAS_URI;

//Connect to DB
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, () => {
    console.log("Database connection established");
});

//Middleware
app.use(express.json());
app.use(cookieParser());

//Route Middleware
app.use('/users', usersRouter);
app.use('/meals', mealsRouter);
app.use('/food', foodsRouter);


//Start Server
app.listen(port, () =>{
    console.log(`Started on port: ${port}`);
})


/*
res.end: comes from NodeJS core. In Express JS if you need to end request in a
quick way and do not need to send any data
then you can use this function.

res.send: Sends data and end the request.

res.json: Sends data in JSON format and ends the request.

EOD, res.json() allows for extra formatting of the JSON data - if this is not required res.send() can 
also be used to return a response object using Express. Both of these methods also end the 
response correctly, and there's no further action required.
*/





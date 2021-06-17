import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex'; 

// const Clarifai = require('Clarifai');
import register from './controllers/register.js';
import signin from './controllers/signin.js';
import profile from './controllers/profile.js';
import image from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.send(`it is workinggggg!`);
})

app.post('/signin', (req, res) => { signin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})
  

// app.post('/imageurl', (req, res) => {
//     app.models.predict(
//         Clarifai.FACE_DETECT_MODEL,
//         req.body.input) 
//         .then( => {
//             res
//         })
// }) 


// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(process.env.PORT || 3000 , ()=>{
    console.log('working😉');
    console.log(`app is running on port  ${ process.env.PORT }`);
});


/* 
/ --> res --> "this is working"
/signin --> POST --> success/fail
/register --> POST --> user
/profile/:userid --> GET --> user
/image --> PUT --> user's count
*/









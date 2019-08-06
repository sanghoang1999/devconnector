const express = require('express');
const connectDB  = require('./config/db');


const app = express();

// Connect Database
connectDB();

//init Middleware

app.use(express.json({ extended:true}))

app.get('/',(req,res)=> {
  res.send('API Running');
})


//Define route

app.use('/api/users',require('./route/api/users'))
app.use('/api/auth',require('./route/api/auth'))
app.use('/api/profile',require('./route/api/profile'))
app.use('/api/posts',require('./route/api/posts'))



const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
  console.log(`Listening on ${PORT}`);
})
const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const bookRoutes=require('./routes/books')


const app=express();

app.use(cors());
app.use(express.json());

app.use('/books',bookRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/bookdb')
.then(()=>
    console.log('connected to Mongodb'))
.catch((err) => console.log("mongodb connection failed:",err));

app.listen(3000,()=>{
    console.log("server running on :http://localhost:3000")
})

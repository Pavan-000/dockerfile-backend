require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db');


connectDB;

const userSchema = mongoose.Schema({
    name : {type : String, required : true},
    age : {type : Number, required : true}
})
const User = mongoose.model('User', userSchema);

const app = express();
app.use(express.json())



app.post('/', async (req, res) => {
    const {name, age} = req.body;
    const data = await User.create({name, age});
    res.status(201).send({data});
})


app.get('/', async (req, res) => {
    const data = await User.find();
    res.status(200).json({data})
})

app.get('/:id', async(req, res) => {
    const data = await User.findById(req.params.id);
    res.status(200).json({data})  
})

app.put('/:id', async(req, res) => {
    const {name, age} = req.body
    const data = await User.findByIdAndUpdate(req.params.id, {name  : name, age : age}, {new : true})
    res.status(200).send({data});
})

app.delete("/:id", async(req, res) => {
    const data = await User.findByIdAndDelete(req.params.id);
    res.status(200).send({
        data
    })
})

app.listen(3000, () => {
    console.log("server listening at 3000")
    
})
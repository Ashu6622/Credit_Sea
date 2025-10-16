const mongoose = require('mongoose');

async function connectDB(){

    try{
        await mongoose.connect('mongodb://localhost:27017/CreditSea');
        console.log('Connected to MongoDB');
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = connectDB;
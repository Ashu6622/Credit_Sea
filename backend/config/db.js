const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const logDBError = (error) => {
    const errorLog = {
        timestamp: new Date().toISOString(),
        type: 'DATABASE_ERROR',
        error: error.message,
        stack: error.stack
    };
    
    const logPath = path.join(__dirname, '../logs/errorLog.txt');
    const logEntry = `${JSON.stringify(errorLog, null, 2)}\n---\n`;
    
    fs.appendFileSync(logPath, logEntry);
};

async function connectDB(){

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    }
    catch(error){
        logDBError(error);
        // console.log(error.message);
        throw error;
    }
}

module.exports = connectDB;
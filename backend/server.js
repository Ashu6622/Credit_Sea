const fs = require('fs');
const path = require('path');

// Process-level error logging for startup errors
const logStartupError = (error) => {
    const errorLog = {
        timestamp: new Date().toISOString(),
        type: 'STARTUP_ERROR',
        error: error.message,
        stack: error.stack
    };
    
    const logPath = path.join(__dirname, './logs/errorLog.txt');
    const logEntry = `${JSON.stringify(errorLog, null, 2)}\n---\n`;
    
    fs.appendFileSync(logPath, logEntry);
};

// Catch uncaught exceptions during startup
process.on('uncaughtException', (error) => {
    logStartupError(error);
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const reportRouter = require('./routes/reportRouter')
const uploadRouter = require('./routes/uploadRouter')
const connectDB = require('./config/db')
const globalErrorHandler = require('./middlewares/globalError')
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());


app.use('/api/report', reportRouter);
app.use('/api/upload', uploadRouter);

// Global error handler (must be last)
app.use(globalErrorHandler);

const logServerError = (error) => {
    const errorLog = {
        timestamp: new Date().toISOString(),
        type: 'SERVER_ERROR',
        error: error.message,
        stack: error.stack
    };
    
    const logPath = path.join(__dirname, './logs/errorLog.txt');
    const logEntry = `${JSON.stringify(errorLog, null, 2)}\n---\n`;
    
    fs.appendFileSync(logPath, logEntry);
};

async function connectServers(){
    try{
        await connectDB();
        
        // Only listen in development or when not deployed
        if (process.env.NODE_ENV !== 'production' || !process.env.RENDER) {
            const PORT = process.env.PORT || 5000;
            app.listen(PORT, (error) => {
                if(error){
                    logServerError(error);
                    console.log(error);
                    process.exit(1);
                }
                console.log(`Server is Running on Port ${PORT}`);
            });
        }
    }
    catch(error){
        logServerError(error);
        process.exit(1);
    }
}

connectServers();

// Export app for Render deployment
module.exports = app;
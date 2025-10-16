const fs = require('fs');
const path = require('path');

const logError = (error, req) => {
    const errorLog = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        error: error.message,
        stack: error.stack,
        ip: req.ip
    };
    
    const logPath = path.join(__dirname, '../logs/errorLog.txt');
    const logEntry = `${JSON.stringify(errorLog, null, 2)}\n---\n`;
    
    fs.appendFileSync(logPath, logEntry);
};

const globalErrorHandler = (err, req, res, next) => {
    logError(err, req);
    
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'})
};

module.exports = globalErrorHandler;
import { format } from 'date-fns';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

export const logEvents = async (message: string, logFileName: string) => {
    const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const logItem = `${dateTime} - ${message}\n`;

    try {
        // write and create log file
        if (!fs.existsSync(path.join(__dirname, '../logs'))) {
            fs.mkdirSync(path.join(__dirname, '../logs'));
        }

        
        //append log to file
        fs.appendFile(path.join(__dirname, `../logs/${logFileName}.log`), logItem, (err) => {
            if (err) {
                console.error(err);
            }
        });
    } catch (error) {
        console.error(error);
    }
};

export const logger = (req: Request, res: Response, next: NextFunction) => {
    logEvents(`Request URL: ${req.originalUrl} - Method: ${req.method}`, 'requests');
    console.log(`Request URL: ${req.originalUrl} - Method: ${req.method}`);
    next();
};
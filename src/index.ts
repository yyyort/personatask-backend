import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response, } from 'express';
import { logger } from './middleware/logger';
import cors from 'cors';
import { corsOptions } from '../config/corsOptions';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use(cors(corsOptions))

// error handler
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
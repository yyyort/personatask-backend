import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response, } from 'express';
import { logger } from './middleware/logger';
import cors from 'cors';
import { corsOptions } from '../config/corsOptions';
import { errorHandler } from './middleware/errorHandler';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/tasks.route';
import noteRoutes from './routes/note.route';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }));

// error handler
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', userRoutes);
app.use('/api', taskRoutes);
app.use('/api', noteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
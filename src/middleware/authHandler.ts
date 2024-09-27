import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';


export const authValidator = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    console.log('token', token);

    // verify token
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN as string, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const { id } = payload as JwtPayload;

        //set user id
        req.body.userId = id;

        next();
    }
    );
}
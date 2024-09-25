
import { Request, Response } from "express";

import { CreateUserType, GetUserType, UpdateUserType } from "../model/users.model";
import { createUserService, updateUserService, getUserService, signInUserService } from "../service/users.service";
import { config } from "dotenv";
config({ path: ".env" }); // or .env.local
import jwt from "jsonwebtoken";

export const signUp = async (req: Request, res: Response) => {
    const data: CreateUserType = req.body;
    
    try {
        const user: GetUserType = await createUserService(data);

        //generate token
        const accessToken = jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_ACCESS_TOKEN as string,
            { expiresIn: '120m' }
        )

        const refreshToken = jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_REFRESH_TOKEN as string,
            { expiresIn: '7d' }
        )

        //send httpOnly cookie
        res.cookie('token', 
            refreshToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            }
        )

        res.status(201).json({
            user,
            token: accessToken
        });
    } catch (error: unknown) {
        if ((error as Error).message === 'User already exists') {
            return res.status(400).json({ message: 'User already exists' });
        }

        res.status(500).json({ message: (error as Error).message });
    }

};

export const signIn = async (req: Request, res: Response) => {
    const data: CreateUserType = req.body;

    try {
        // login user
        const user: GetUserType = await signInUserService(data);

        //generate token
        const accessToken = jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_ACCESS_TOKEN as string,
            { expiresIn: '120m' }
        )

        const refreshToken = jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_REFRESH_TOKEN as string,
            { expiresIn: '7d' }
        )

        //send httpOnly cookie
        res.cookie('token', 
            refreshToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            }
        )

        res.status(200).json({
            user,
            token: accessToken
        });
    } catch (error: unknown) {
        if ((error as Error).message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        }

        if ((error as Error).message === 'Invalid email or password') {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(500).json({ message: (error as Error).message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const data: UpdateUserType = req.body;

    try {
        // update user
        const user: GetUserType = await updateUserService(data);

        res.status(200).json(user);
    } catch (error: unknown) {
        if ((error as Error).message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(500).json({ message: (error as Error).message });
    }
};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // get user
        const user: GetUserType = await getUserService(id);

        res.status(200).json(user);
    } catch (error: unknown) {
        if ((error as Error).message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(500).json({ message: (error as Error).message });
    }
}

export const signOut = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Sign out successfully' });
};

export const refreshToken = async (req: Request, res: Response) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        jwt.verify(
            token,
            process.env.JWT_REFRESH_TOKEN as string,
            async (err: unknown, decoded: unknown) => {
                if (err) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }

                const user = decoded as GetUserType;
                const foundUser: GetUserType = await getUserService(user.id);

                //generate token
                const accessToken = jwt.sign(
                    {
                        id: user.id,
                    },
                    process.env.JWT_ACCESS_TOKEN as string,
                    { expiresIn: '120m' }
                )
        
                return res.status(200).json({
                    user: foundUser,
                    token: accessToken
                });
            }
        )
    } catch (error: unknown) {
        res.status(401).json({ message: (error as Error).message });
    }
};
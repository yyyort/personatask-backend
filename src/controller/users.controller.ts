
import { Request, Response } from "express";

import { CreateUserType, GetUserType, UpdateUserType } from "../model/users.model";
import { createUserService, updateUserService, getUserService, signInUserService } from "../service/users.service";

export const signUp = async (req: Request, res: Response) => {
    const data: CreateUserType = req.body;
    
    try {
        const user: GetUserType = await createUserService(data);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }

};

export const signIn = async (req: Request, res: Response) => {
    const data: CreateUserType = req.body;

    try {
        // login user
        const user: GetUserType = await signInUserService(data);

        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const data: UpdateUserType = req.body;

    try {
        // update user
        const user: GetUserType = await updateUserService(data);

        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // get user
        const user: GetUserType = await getUserService(id);

        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const signOut = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Sign out successfully' });
};
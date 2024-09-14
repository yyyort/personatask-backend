import { eq } from "drizzle-orm";
import { db } from "../db";
import { CreateUserType, GetUserType, UpdateUserType, UserModelType } from "../model/users.model";
import { usersTable } from "../schema";
import bcrypt from 'bcrypt';


export async function createUserService(data: CreateUserType) {
    try {

        //check if email already existss
        const userExist = await db.select({
            email: usersTable.email
        }).from(usersTable).where(eq(usersTable.email, data.email)).limit(1);

        if (userExist.length > 0) {
            throw new Error('User already exists');
        }

        //hash password
        const saltRounds = parseInt(process.env.SALT_ROUNDS as string);
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        //create user
        const user: GetUserType[] = await db.insert(usersTable).values({
            email: data.email,
            password: hashedPassword
        }).returning({
            id: usersTable.id,
            email: usersTable.email,
        });

        return user[0];
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function signInUserService(data: CreateUserType) {
    try {
        //get user from db
        const user = await db.select({
            id: usersTable.id,
            email: usersTable.email,
            password: usersTable.password
        }).from(usersTable).where(eq(usersTable.email, data.email)).limit(1);

        //if there is no user
        if (user.length <= 0) {
            throw new Error('Invalid email or password');
        }

        //compare password
        const match = await bcrypt.compare(data.password, user[0].password);

        if (!match) {
            throw new Error('Invalid email or password');
        }

        return {
            id: user[0].id,
            email: user[0].email
        };

        //return user
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateUserService(data: UpdateUserType) {
    try {
        //if password is provided hash it
        if (data?.password) {
            const saltRounds = parseInt(process.env.SALT_ROUNDS as string);
            data.password = await bcrypt.hash(data.password, saltRounds);
        }

        //update user
        const user: GetUserType[] = await db.update(usersTable).set({
            email: data?.email,
            password: data?.password
        }).where(eq(usersTable.id, data!.id)).returning({
            id: usersTable.id,
            email: usersTable.email,
        });

        //if user is not found
        if (user.length <= 0) {
            throw new Error('User not found');
        }

        return user[0];
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getUserService(id: string) {
    try {
        //get user
        const user: GetUserType[] = await db.select({
            id: usersTable.id,
            email: usersTable.email,
        }).from(usersTable).where(eq(usersTable.id, id)).limit(1);

        //if user is not found
        if (user.length <= 0) {
            throw new Error('User not found');
        }

        return user[0];
    } catch (error: any) {
        throw new Error(error.message);
    }
}
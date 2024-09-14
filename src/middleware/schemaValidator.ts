import { NextFunction, Response, Request } from "express";
import { z, ZodSchema } from "zod";

export const schemaValidator = (schema: ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error: any) {
            res.status(400).json({ message: error.errors });
        }
    }
}
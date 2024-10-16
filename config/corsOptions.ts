import { allowedOrigins } from "./allowedOrigins"

export const corsOptions = {
    origin: (origin: string | undefined, callback: (error: Error | null, allow: boolean) => void) => {
        if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'), false)
        }
    }
}
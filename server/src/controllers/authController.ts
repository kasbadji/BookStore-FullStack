import { AuthService } from "../services/authService";
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

export class AuthController{
    static async register(req: Request, res: Response, next: NextFunction){
        try{
            const { email, password, name } = req.body;
            if(!email || !password || !name){
                throw new ApiError(400, "Email, name and password are required")
            }

            const result = await AuthService.register(email, password, name);
            res.status(201).json(result);
        }
        catch(error){
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction){
        try{
            const { email, password } = req.body;
            if(!email || !password){
                throw new ApiError(400, "Email and password are required");
            }

            const result = await AuthService.login(email, password);
            res.status(200).json(result);
        }
        catch(error){
            next(error);
        }
    }
}

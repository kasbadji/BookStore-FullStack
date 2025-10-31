import prisma from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";

const JWT_SECRET = (process.env.JWT_SECRET || "your_jwt_secret") as string;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "1h") as string;

export class AuthService {
    static generateToken(id: string, role: string){
        return (jwt as any).sign({ id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }

    static async register(email:string, password:string, name:string) {
        if(!email || !password || !name) {
            throw new ApiError(400, "Email, password, and name are required");
        }

        const existUser = await prisma.user.findUnique({ where: { email } });
        if (existUser) {
            throw new ApiError(409, "User already exists");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashPassword,
                name,
                role: "USER",
            },
        });

        const token = AuthService.generateToken(newUser.id, newUser.name);
        const {password:_, ...safeUser} = newUser;
        return { user: safeUser, token };
    }

    static async login(email: string, password: string){
        if(!email || !password){
            throw new ApiError(400, "Email and password are required");
        }

        const user = await prisma.user.findUnique({where : {email}});
        if (!user){
            throw new ApiError(400 , "Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            throw new ApiError(400, "Invalid email or password");
        }

        const token = AuthService.generateToken(user.id, user.role);
        const {password:_, ...safeUser} = user;
        return { user: safeUser, token };

    }
}

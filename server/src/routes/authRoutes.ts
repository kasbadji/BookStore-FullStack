import { AuthController } from "../controllers/authController";
import { Router, Response, NextFunction, RequestHandler } from "express";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.get("/me", verifyToken as RequestHandler, (req, res) => {
    const user = (req as any).user;
    return res.json({ user });
});


export default router;

import { AuthController } from "../controllers/authController";
import { Router, RequestHandler } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import prisma from "../config/db";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// Return the full user (without password) for the authenticated token
router.get("/me", verifyToken as RequestHandler, async (req, res) => {
    try {
        const userOnReq = (req as any).user;
        if (!userOnReq || !userOnReq.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

            const user = await prisma.user.findUnique({
                where: { id: userOnReq.id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
            });

        if (!user) return res.status(404).json({ message: "User not found" });

        return res.json({ user });
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch user" });
    }
});

export default router;

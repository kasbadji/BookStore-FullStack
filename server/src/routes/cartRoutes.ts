import { Router } from "express";
import { cartController } from "../controllers/cartController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", verifyToken ,cartController.getCart);
router.post("/add", verifyToken, cartController.addItem);
router.delete("/item/:itemId", verifyToken ,cartController.removeItem);
router.delete("/clear", verifyToken ,cartController.clearCart);

export default router;

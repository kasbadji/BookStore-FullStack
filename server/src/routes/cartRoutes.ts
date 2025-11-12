import { RequestHandler, Router } from "express";
import { cartController } from "../controllers/cartController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", verifyToken as RequestHandler ,cartController.getCart);
router.post("/add", verifyToken as RequestHandler, cartController.addItem);
router.delete("/item/:itemId", verifyToken as RequestHandler ,cartController.removeItem);
router.delete("/clear", verifyToken as RequestHandler ,cartController.clearCart);

export default router;

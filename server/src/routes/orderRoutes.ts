import { Router } from "express";
import { orderController } from "../controllers/orderController";

const router = Router();

router.post("/checkout", orderController.checkout);
router.get("/", orderController.getUserOrders);

export default router;

import { Request, Response, NextFunction } from "express";
import { orderService } from "../services/orderService";

export class orderController {
    static async checkout(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const order = await orderService.checkout(userId);
            return res.status(201).json(order);
        } catch (error) {
            next(error);
        }
    }

    static async getUserOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const orders = await orderService.getOrdersByUserId(userId);
            return res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }
}

import { Request, Response, NextFunction } from "express";
import { cartService } from "../services/cartService";


export class cartController {
    static async getCart(req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.user!.id;
            const cart = await cartService.getCartByUserId(userId);
            res.json(cart);
        }
        catch(error){
            next(error);
        }
    }

    static async addItem(req: Request, res: Response, next: NextFunction){
        try{
            const userId = req.user!.id;
            const { bookId, quantity } = req.body;
            const item = await cartService.addItem(userId, bookId, quantity);
            res.status(201).json(item);
        }
        catch(error){
            next(error);
        }
    }

    static async removeItem(req: Request, res:Response,next:NextFunction) {
        try {
            await cartService.removeItem(req.params.itemId as string);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }

  static async clearCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      await cartService.clearCart(userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}



//! req.user!.id
//! if (req.user === undefined) throw new Error("req.user is undefined");
//! const userId = req.user.id;


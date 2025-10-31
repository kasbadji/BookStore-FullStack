import { serviceBook } from "../services/bookService"
import { Request, Response, NextFunction } from "express";

export class bookController{
    static async getAllBook(req: Request, res: Response, next: NextFunction){
        try{
            const books = await serviceBook.getAllBook()
            return res.json(books);
        }
        catch(error){
            next(error);
        }
    }

    static async getBookById(req: Request, res: Response, next: NextFunction){
        try{
            const book = await serviceBook.getBookById(req.params.bookId as string);
            if(!book) return res.status(404).json({ message: "Book not found" });
            res.json(book);
        }
        catch(error){
            next(error);
        }
    }

    static async createBook(req: Request, res: Response, next: NextFunction){
        try {
            const book = await serviceBook.createBook(req.body);
            res.status(201).json(book);
        }
        catch(error){
            next(error);
        }
    }

    static async updateBook(req: Request, res: Response, next: NextFunction){
        try {
            const updated = await serviceBook.updateBook(req.params.bookId as string, req.body);
            res.json(updated);
        }
        catch(error){
            next(error);
        }
    };

    static async deleteBook (req: Request, res: Response, next: NextFunction){
       try{
         await serviceBook.deleteBook(req.params.bookId as string);
         res.status(204).send();
       }
       catch(error){
        next(error);
       }
    };
}

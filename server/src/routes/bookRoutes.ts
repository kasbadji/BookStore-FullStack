import { Router, RequestHandler } from "express";
import { bookController } from "../controllers/bookController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", verifyToken as RequestHandler ,bookController.getAllBook);

router.get("/:bookId", bookController.getBookById);

router.post("/", verifyToken as RequestHandler, bookController.createBook);

router.put("/:bookId", verifyToken as RequestHandler, bookController.updateBook);

router.delete("/:bookId", verifyToken as RequestHandler, bookController.deleteBook);

export default router;

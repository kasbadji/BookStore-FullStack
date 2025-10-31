import { Router } from "express";
import { bookController } from "../controllers/bookController";

const router = Router();

router.get("/", bookController.getAllBook);
router.get("/:bookId", bookController.getBookById);
router.post("/", bookController.createBook);
router.put("/:bookId", bookController.updateBook);
router.delete("/:bookId", bookController.deleteBook);

export default router;

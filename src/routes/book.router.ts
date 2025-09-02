import { Router } from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/Book.controllers";
import { upload } from "../middlewares/uploads";

const router = Router();

// POST book مع صورة
router.post("/", upload.single("image"), createBook);

// PUT book مع صورة جديدة (اختياري)
router.put("/:bookId", upload.single("image"), updateBook);

router.get("/", getBooks);
router.get("/:bookId", getBookById);
router.delete("/:bookId", deleteBook);

export default router;

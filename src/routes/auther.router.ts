import { Router } from "express";
import {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/Author.controllers";

const router = Router();

router.get("/", getAuthors);
router.get("/:authorId", getAuthorById);
router.post("/", createAuthor);
router.put("/:authorId", updateAuthor);
router.delete("/:authorId", deleteAuthor);

export default router;

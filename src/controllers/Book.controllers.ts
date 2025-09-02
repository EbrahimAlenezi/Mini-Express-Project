import { Request, Response } from "express";
import Book from "../models/Book";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find()
      .populate("author", "-createdAt -updatedAt")
      .populate("catagories", "-createdAt -updatedAt");
    res.status(200).json(books);
  } catch (error) {
    console.error("getBooks error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId)
      .populate("author", "-createdAt -updatedAt")
      .populate("catagories", "-createdAt -updatedAt");
    if (!book) return res.status(404).send("Book not found");
    res.status(200).json(book);
  } catch (error) {
    console.error("getBookById error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    let { title, author, catagories = [] } = req.body;

    if (catagories && !Array.isArray(catagories)) {
      catagories = [catagories];
    }

    const newBook = new Book({
      title,
      author,
      catagories,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
    });

    const saved = await newBook.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("createBook error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Body is required for PUT" });
    }

    let updateData = { ...req.body };
    if (updateData.catagories && !Array.isArray(updateData.catagories)) {
      updateData.catagories = [updateData.catagories];
    }

    const updated = await Book.findByIdAndUpdate(bookId, updateData, {
      runValidators: true,
      overwrite: true,
      new: true,
    });

    if (!updated) return res.status(404).send("Book not found");
    return res.status(200).json(updated);
  } catch (error) {
    console.error("updateBook error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).send("Book not found");
    await book.deleteOne();
    return res.status(204).send();
  } catch (error) {
    console.error("deleteBook error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

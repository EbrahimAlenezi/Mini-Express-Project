import { Request, Response } from "express";
import Author from "../models/Author";

export const getAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.find().select("-createdAt -updatedAt");
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const { authorId } = req.params;
    const author = await Author.findById(authorId).select(
      "-createdAt -updatedAt"
    );
    if (!author) return res.status(404).send("Author not found");
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name, country, books = [] } = req.body;
    const newAuthor = await Author.create({ name, country, books });
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { authorId } = req.params;
    const author = await Author.findById(authorId);
    if (!author) return res.status(404).send("Author not found");
    await Author.replaceOne({ _id: authorId }, req.body, {
      runValidators: true,
    });
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const { authorId } = req.params;
    const author = await Author.findById(authorId);
    if (!author) return res.status(404).send("Author IS not found");
    await author.deleteOne();
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

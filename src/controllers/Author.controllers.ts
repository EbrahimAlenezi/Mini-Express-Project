import { Request, Response } from "express";
import Author from "../models/Author";

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const allAuthors = await Author.find();
    res.status(200).json(allAuthors);
  } catch (error) {
    res.status(500).json({ message: "Somthing went wrong", error });
  }
};

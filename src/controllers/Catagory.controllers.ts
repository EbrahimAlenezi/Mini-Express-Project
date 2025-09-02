import { Request, Response } from "express";
import Catagorie from "../models/Catagorie";

export const getCatagories = async (req: Request, res: Response) => {
  try {
    const catagories = await Catagorie.find().select("-createdAt -updatedAt");
    res.status(200).json(catagories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getCatagorieById = async (req: Request, res: Response) => {
  try {
    const { catagorieId } = req.params;
    const catagorie = await Catagorie.findById(catagorieId).select(
      "-createdAt -updatedAt"
    );
    if (!catagorie) return res.status(404).send("Catagorie not found");
    res.status(200).json(catagorie);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createCatagorie = async (req: Request, res: Response) => {
  try {
    const { name, books = [] } = req.body;
    const newCatagorie = await Catagorie.create({ name, books });
    res.status(201).json(newCatagorie);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateCatagorie = async (req: Request, res: Response) => {
  try {
    const { catagorieId } = req.params;
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Body is required for PUT" });
    }
    const updated = await Catagorie.findByIdAndUpdate(catagorieId, req.body, {
      runValidators: true,
      overwrite: true,
      new: true,
    });
    if (!updated) return res.status(404).send("Catagorie not found");
    return res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteCatagorie = async (req: Request, res: Response) => {
  try {
    const { catagorieId } = req.params;
    const catagorie = await Catagorie.findById(catagorieId);
    if (!catagorie) return res.status(404).send("Catagorie not found");
    await catagorie.deleteOne();
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

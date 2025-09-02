import { Router } from "express";
import {
  getCatagories,
  getCatagorieById,
  createCatagorie,
  updateCatagorie,
  deleteCatagorie,
} from "../controllers/Catagory.controllers";

const router = Router();

router.get("/", getCatagories);
router.get("/:catagorieId", getCatagorieById);
router.post("/", createCatagorie);
router.put("/:catagorieId", updateCatagorie);
router.delete("/:catagorieId", deleteCatagorie);

export default router;

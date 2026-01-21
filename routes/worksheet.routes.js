import { Router } from "express";
import {
  checkWorksheetAnswer,
  getAllWorksheets,
} from "../controllers/worksheet.controller.js";

const router = Router();

router.get("/worksheet/tasks", getAllWorksheets);

router.post("/worksheet/tasks/:taskId/answer", checkWorksheetAnswer);

export default router;

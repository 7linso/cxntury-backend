import { Router } from "express";
import { getOrCreateSession } from "../controllers/session.controller.js";

const router = Router();

router.get("/session", getOrCreateSession);

export default router;

// src/routes/impact.routes.js

import express from "express";
import { createImpact } from "../controllers/impact.controller.js";

const router = express.Router();

router.post("/generate", createImpact);

export default router;
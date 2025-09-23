import express from "express";
import { createPoll, getActivePolls, getPollResults, submitAnswer } from "../controllers/poll.controller.js";

const router = express.Router();

router.post("/", createPoll);
router.get("/active", getActivePolls);
router.post("/:id/answer", submitAnswer);
router.get("/:id/results", getPollResults);

export default router;
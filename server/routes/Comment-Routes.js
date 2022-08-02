import express from "express";
import {
  addComment,
  deleteComment,
  getComment,
  updateComment,
} from "../controllers/Comment-Controllers.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// ADD Comment
router.post("/", verifyToken, addComment);

// UPDATE Comment
router.put("/:id", verifyToken, updateComment);

// DELETE Comment
router.delete("/:videoId", verifyToken, deleteComment);

// GET Comment
router.get("/:videoId", getComment);

export default router;

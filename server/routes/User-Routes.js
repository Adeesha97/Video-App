import express from "express";
import {
  deleteUser,
  dislike,
  getUser,
  like,
  subscribe,
  unsubscribe,
  updateUser,
} from "../controllers/User-Controllers.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// UPDATE USER
router.put("/:id", verifyToken, updateUser);

// DELETE USER
router.delete("/:id", verifyToken, deleteUser);

// GET A USER
router.get("/find/:id", getUser);

// SUBSCRIBE A USER
router.put("/sub/:id", verifyToken, subscribe);

// UNSUBSCRIBE A USER
router.put("/unsub/:id", verifyToken, unsubscribe);

// LIKE A VIDEO
router.get("/like/:videoId", verifyToken, like);

// DISLIKE A VIDEO
router.get("/dislike/:videoId", verifyToken, dislike);

export default router;

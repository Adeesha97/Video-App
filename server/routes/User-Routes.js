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
// router.delete("/:id", deleteUser);

// GET A USER
router.get("/find/:id", getUser);

// SUBSCRIBE A USER
router.get("/sub/:id", subscribe);

// UNSUBSCRIBE A USER
router.get("/unsub/:id", unsubscribe);

// LIKE A VIDEO
router.get("/like/:videoId", like);

// DISLIKE A VIDEO
router.get("/dislike/:videoId", dislike);

export default router;

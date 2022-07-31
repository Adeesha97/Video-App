import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  random,
  trend,
  updateVideo,
  subscribedVideo,
  getByTags,
  search,
} from "../controllers/Video-Controllers.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// ADD Video
router.post("/", verifyToken, addVideo);

// UPDATE Video
router.put("/:id", verifyToken, updateVideo);

// DELETE Video
router.delete("/:id", verifyToken, deleteVideo);

// GET Video
router.get("/find/:id", getVideo);

// Viewed Video
router.get("/view/:id", addView);

// Trending Videos
router.get("/trend", trend);

// Random Videos
router.get("/random", random);

// Subscribed Videos
router.get("/sub", verifyToken, subscribedVideo);

// Tags Videos
router.get("/tags", getByTags);

// Search Videos
router.get("/search", search);

export default router;

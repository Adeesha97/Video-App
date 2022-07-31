import { createError } from "../error.js";
import Video from "../models/Video.js";
import Comment from "../models/Comments.js";

// Add Comment
export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    next(err);
  }
};

// Update Comment
export const updateComment = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

// Delete Comment
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(res.params.id);
    const video = await Video.findById(res.params.id);

    // Check owner of the comment or video
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment has been deleted!");
    } else {
      next(createError(200, "You can delete only your comment!"));
    }
  } catch (err) {
    next(err);
  }
};

// Get Comment
export const getComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

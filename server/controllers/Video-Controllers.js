import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

// Add Video
export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const saveVideo = await newVideo.save();
    res.status(200).json(saveVideo);
  } catch (err) {
    next(err);
  }
};

// Update Video
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    //   Check video is available
    if (!video) {
      return next(createError(404, "Video not found!"));
    }
    // Check user is uploaded user
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateVideo);
    } else {
      return next(createError(404, "You can update only your videos!"));
    }
  } catch (err) {
    next(err);
  }
};

// Delete Video
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    //   Check video is available
    if (!video) {
      return next(createError(404, "Video not found!"));
    }
    // Check user is uploaded user
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("The video has been deleted!");
    } else {
      return next(createError(404, "You can delete only your videos!"));
    }
  } catch (err) {
    next(err);
  }
};

// Get Video
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

// Viewed Video
export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.status(200).json("The view has been increased by One");
  } catch (err) {
    next(err);
  }
};

// Trending Videos
export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// Random Videos
export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// Subscribed Videos
export const subscribedVideo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

// Tags
export const getByTags = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  console.log(tags);
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// Search
export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

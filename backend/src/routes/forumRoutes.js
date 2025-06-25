const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js")
const {createDiscussion, getDiscussion , postforumReply , forumDiscussion , forumTopicLike, forumTopicDislike, checkUserLikedForumTopic, fourmTopicLikeCount, forumReplyDislike, checkUserLikedForumReply, forumReplyLike, fourmReplyLikeCount} = require("../controllers/forumController.js");

const router = express.Router();

router.post("/create" , authMiddleware , createDiscussion);
router.get("/" , authMiddleware , getDiscussion);
router.post("/reply" , authMiddleware , postforumReply);

router.post("/like" , authMiddleware , forumTopicLike);
router.delete("/dislike" , authMiddleware , forumTopicDislike);
router.get("/checklike" , authMiddleware , checkUserLikedForumTopic);
router.get("/like-count" , authMiddleware , fourmTopicLikeCount);

router.post("/reply/like" , authMiddleware , forumReplyLike);
router.delete("/reply/dislike" , authMiddleware , forumReplyDislike);
router.get("/reply/checklike" , authMiddleware , checkUserLikedForumReply);
router.get("/reply/like-count" , authMiddleware , fourmReplyLikeCount);

// Put this last because it's a catch-all route with param
router.get("/:id", forumDiscussion);

module.exports = router;
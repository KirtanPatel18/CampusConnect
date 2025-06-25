const prisma = require("../config/db.js");

const createDiscussion = async (req, res) => {
  const { title, category, content } = req.body;

  try {
    const newForum = await prisma.forumTopic.create({
      data: {
        title,
        description: content,
        category,
        author_id: req.userId,
      },
    });

    if (!newForum)
      return res.json({ success: false, message: "Discussion is not Created" });

    return res.json({ success: true, message: "Discussion Created" });
  } catch (error) {
    console.log("Error in creating discussion", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getDiscussion = async (req, res) => {
  try {
    const forumDiscussion = await prisma.forumTopic.findMany({
      include: {
        author: {
          select: {
            id: true,
            full_name: true,
            avatar_url: true,
          },
        },
        _count: {
          select: {
            replies: true,
            likes: true,
          },
        },
      },
    });

    console.log(forumDiscussion);

    if (!forumDiscussion || forumDiscussion.length === 0) {
      return res.json({ success: false, message: "No discussions found" });
    }

    return res.json({
      success: true,
      message: "Forum Discussion",
      data: forumDiscussion,
    });
  } catch (error) {
    console.error("Error in getDiscussion:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const postforumReply = async (req, res) => {
  const { topic_id, content } = req.body;
  const author_id = req.userId;

  try {
    const newReply = await prisma.forumReply.create({
      data: {
        topic_id,
        content,
        author_id,
      },
      include: {
        author: {
          select: {
            avatar_url: true,
            full_name: true,
            major: true,
          },
        },
      },
    });

    if (!newReply)
      return res.json({ success: false, message: "Reply was not posted" });

    // ✅ Emit from backend (very important for real-time sync to all users)
    const io = req.app.get("io"); // this comes from server.js setup
    io.emit("new_reply", newReply); // Broadcast to all clients

    return res.json({
      success: true,
      message: "Reply is posted",
      reply: newReply,
    });
  } catch (error) {
    console.log("Error in forumreply", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const forumDiscussion = async (req, res) => {
  const topic_id = req.params.id;

  try {
    const discussion = await prisma.forumTopic.findFirst({
      where: {
        id: topic_id,
      },
      include: {
        author: true,
        replies: {
          include: {
            author: {
              select: {
                full_name: true,
                avatar_url: true,
                major: true,
              },
            },
          },
        },
      },
    });

    if (!discussion)
      return res.json({ success: false, message: "discussion is not fetch" });

    return res.json({ success: true, forumDiscussion: discussion });
  } catch (error) {
    console.log("Error in forumdiscussion", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const forumTopicLike = async (req, res) => {
  const { topic_id } = req.body;

  try {
    const like = await prisma.forumTopicLike.create({
      data: {
        topic_id,
        user_id: req.userId,
      },
    });

    return res.json({ success: true, message: "forum liked" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const forumTopicDislike = async (req, res) => {
  const { topic_id } = req.query;

  try {
    const like = await prisma.forumTopicLike.delete({
      where: {
        topic_id_user_id: {
          topic_id,
          user_id: req.userId,
        },
      },
    });

    return res.json({ success: true, message: "forum disliked" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const fourmTopicLikeCount = async (req, res) => {
  const { topic_id } = req.query;

  try {
    const count = await prisma.forumTopicLike.count({
      where: {
        topic_id,
      },
    });
    if (!count) return res.json({ success: false, message: "No likes" });
    return res.json({ success: true, likeCount: count });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const checkUserLikedForumTopic = async (req, res) => {
  const { topic_id } = req.query;
  try {
    const liked = await prisma.forumTopicLike.findUnique({
      where: {
        topic_id_user_id: {
          topic_id,
          user_id: req.userId,
        },
      },
    });

    if (!liked) return res.json({ success: false, message: "not liked" });

    return res.json({ success: true, liked: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const forumReplyLike = async (req, res) => {
  const { reply_id } = req.body;

  try {
    const like = await prisma.ForumReplyLike.create({
      data: {
        reply_id,
        user_id: req.userId,
      },
    });

    return res.json({ success: true, message: "reply liked" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const forumReplyDislike = async (req, res) => {
  const { reply_id } = req.query;

  try {
    const like = await prisma.ForumReplyLike.delete({
      where: {
        reply_id_user_id: {
          reply_id,
          user_id: req.userId,
        },
      },
    });

    return res.json({ success: true, message: "reply disliked" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const fourmReplyLikeCount = async (req, res) => {
  const { reply_id } = req.query;

  try {
    const count = await prisma.ForumReplyLike.count({
      where: {
        reply_id,
      },
    });
    if (!count) return res.json({ success: false, message: "No likes" });
    return res.json({ success: true, likeCount: count });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const checkUserLikedForumReply = async (req, res) => {
  const { reply_id } = req.query;
  try {
    const liked = await prisma.ForumReplyLike.findUnique({
      where: {
        reply_id_user_id: {
          reply_id,
          user_id: req.userId,
        },
      },
    });

    if (!liked) return res.json({ success: false, message: "not liked" });

    return res.json({ success: true, liked: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createDiscussion,
  getDiscussion,
  postforumReply,
  forumDiscussion,
  forumTopicLike,
  forumTopicDislike,
  fourmTopicLikeCount,
  checkUserLikedForumTopic,
  forumReplyLike,
  forumReplyDislike,
  fourmReplyLikeCount,
  checkUserLikedForumReply
};

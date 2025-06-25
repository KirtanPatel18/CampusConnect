const prisma = require("../config/db.js"); // assuming a DB model

const handleNewMessage = async (data, socket, io) => {
//     const {topic_id, content, author_id} = data;
//   try {
//     const savedMessage = await prisma.forumReply.create({
//       data: {
//         topic_id,
//         content,
//         author_id,
//       },
//     });

//     io.emit("receive_message", savedMessage); // emit only after saving
//   } catch (error) {
//     console.error("Error saving message:", error);
//     socket.emit("error_message", "Failed to save message");
//   }
};

module.exports = { handleNewMessage };

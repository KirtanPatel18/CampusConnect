import { useState, useEffect } from "react";
import socket from "../../sockets/socket.js"; // adjust if needed

export const ForumReplyForm = ({ topic_id, onNewReply }) => {
  const [replyContent, setReplyContent] = useState("");

  // 🔁 Listen to replies from backend
  useEffect(() => {
    const handleNewReply = (reply) => {
      if (reply.topic_id === topic_id) {
        // Call parent handler to update the UI
        onNewReply?.(reply);
      }
    };

    socket.on("new_reply", handleNewReply);

    return () => {
      socket.off("new_reply", handleNewReply);
    };
  }, [topic_id, onNewReply]);

  const postReply = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/forum/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ topic_id, content: replyContent }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Reply successfully posted.");
        // No emit here — backend will emit after saving
      }
    } catch (error) {
      console.log("Error posting reply:", error);
    }
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    await postReply();
    setReplyContent("");
  };

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 transition-all hover:shadow-md">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <svg 
              className="w-5 h-5 mr-2 text-indigo-600" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM4 5v8h4v3.93L10.94 13H16V5H4z" />
            </svg>
            Post a Reply
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Share your knowledge or ask a question
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmitReply}>
            <div className="space-y-6">
              <div className="relative">
                <textarea
                  placeholder="Write your reply here..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full min-h-[150px] p-4 border border-gray-200 rounded-lg 
                            resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 
                            focus:border-transparent transition-all duration-300
                            shadow-sm"
                />
                <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                  {replyContent.length}/1000
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button 
                    type="button"
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button 
                    type="button"
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <button
                  type="submit"
                  disabled={!replyContent.trim()}
                  className={`px-5 py-3 rounded-lg font-medium text-white transition-all duration-300 flex items-center
                    ${
                      replyContent.trim()
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-700"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                  <svg
                    className="h-5 w-5 mr-2 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  Post Reply
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

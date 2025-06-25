// src/components/RepliesSection.jsx
import {
  ThumbsUp,
  Share2,
  MessageSquare,
  MoreHorizontal,
  Flag,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
} from "lucide-react";
import { useState , useEffect } from "react";

export const ForumReplyCard = ({ reply }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const checklike = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/forum/reply/checklike?reply_id=${reply.id}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.success) {
          setIsLiked(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checklike();
  }, [reply.id]);

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/forum/reply/like-count?reply_id=${reply.id}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.success) {
          setLikeCount(data.likeCount);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchLikeCount();
  }, [reply.id]);

  const handleLike = async () => {
    if (!isLiked) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/forum/reply/like",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reply_id: reply.id }),
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.success) {
          setLikeCount((count) => count + 1);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/forum/reply/dislike?reply_id=${reply.id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.success) {
          setLikeCount((count) => count - 1);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md duration-300">
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Enhanced Avatar */}
          <div className="hidden sm:block flex-shrink-0">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full w-12 h-12 flex items-center justify-center shadow-sm">
              <span className="text-indigo-700 font-medium text-lg">
                {reply.author.full_name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {/* Enhanced Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <div className="sm:hidden flex-shrink-0">
                  <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-indigo-700 font-medium">
                      {reply.author.full_name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {reply.author.full_name}
                    </h3>
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      {reply.author?.major}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center">
                    <span className="mr-2">Posted on {new Date(reply.created_at).toLocaleDateString()}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span className="ml-2">Student</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-gray-500">
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>

            {/* Enhanced Content */}
            <div className="prose max-w-none mb-4">
              <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-lg p-4">
                {reply.content}
              </p>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                    isLiked
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                  aria-pressed={isLiked}
                >
                  <ThumbsUp
                    size={18}
                    className={isLiked ? "fill-indigo-500" : ""}
                  />
                  <span className="font-medium">{likeCount}</span>
                </button>
                
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-all duration-200">
                  <ChevronDown size={18} />
                  <span>Reply</span>
                </button>
              </div>
              
              <div className="text-xs text-gray-500">
                {new Date(reply.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

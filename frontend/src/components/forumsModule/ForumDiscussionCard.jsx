import { formatDistanceToNow } from "date-fns";

export const ForumDiscussionCard = ({ forum }) => {
  const timeAgo = formatDistanceToNow(new Date(forum.created_at), {
    addSuffix: true,
  });

  // const [likeCount, setLikeCount] = useState(0);

  // const fetchLikeCount = async (id) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/api/v1/forum/like-count?topic_id=${id}`,
  //       {
  //         credentials: "include",
  //       }
  //     );
  //     const data = await response.json();
  //     if (data.success) {
  //       setLikeCount(data.likeCount);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div
      className="p-5 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer bg-white group"
      onClick={() => (window.location.href = `/forum/${forum.id}`)}
    >
      <div className="flex items-start gap-4">
        {/* Enhanced Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 border-2 border-white shadow-md">
            {forum.author.avatar_url ? (
              <img
                src={forum.author.avatar_url}
                alt={forum.author.full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-indigo-700 font-bold text-lg">
                {forum.author.initials ||
                  forum.author.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {/* Enhanced Header */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {forum.isPinned && (
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="17" x2="12" y2="22" />
                      <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
                    </svg>
                    Pinned
                  </span>
                )}
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                  {forum.title}
                </h3>
              </div>

              {/* Enhanced Meta */}
              <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                <span className="font-medium text-gray-700">
                  by {forum.author.full_name}
                </span>
                <span className="text-gray-400">•</span>
                <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                  {forum.category}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">{timeAgo}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Enhanced Engagement Metrics */}
              <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="font-medium">{forum._count.replies}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                <span className="font-medium">{forum._count.likes || 0}</span>
              </div>
            </div>
          </div>

          {/* Description snippet */}
          {forum.description && (
            <p className="text-gray-600 text-sm mt-3 line-clamp-2">
              {forum.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

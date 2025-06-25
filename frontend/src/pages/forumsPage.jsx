import { useEffect, useState } from "react";
import { AppLayout } from "../components/AppLayout.jsx";
import { ForumFilterbar } from "../components/forumsModule/ForumFilterbar.jsx";
import { ForumDiscussionCard } from "../components/forumsModule/ForumDiscussionCard.jsx";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ForumsPage = () => {
  const navigate = useNavigate();
  const [forumDiscussion, setforumDiscussion] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  const getForumDiscussion = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/v1/forum", {
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setforumDiscussion(data.data);
      }
    } catch (error) {
      console.log("error in getdiscussion", error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    getForumDiscussion();
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const filteredForum = forumDiscussion.filter((forum) =>
    forum.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (forum.description && forum.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <AppLayout>
      <ForumFilterbar handleSearchChange={handleSearchChange} searchQuery={searchQuery} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-5 py-5 pb-16">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {filteredForum.length > 0 ? (
                filteredForum.map((forum, index) => (
                  <ForumDiscussionCard key={index} forum={forum} />
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No discussions found</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    {searchQuery ? 'No discussions match your search.' : 'Be the first to start a discussion!'}
                  </p>
                  {!searchQuery && (
                    <button
                      onClick={() => navigate("/ForumCreate")}
                      className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium"
                    >
                      Create a topic
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};
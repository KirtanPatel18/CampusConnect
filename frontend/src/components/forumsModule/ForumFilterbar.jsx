import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ForumFilterbar = ({searchQuery, handleSearchChange}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Discussion Forums
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Connect, collaborate, and share knowledge with your peers. Explore topics, ask questions, and contribute to discussions.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            {/* Enhanced Search */}
            <div className="relative flex-1 min-w-[350px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search discussions by title or content..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 text-base bg-white border border-gray-300 rounded-xl shadow-sm 
                     transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent"
              />
            </div>
            
            <button
              type="button"
              aria-label="Create new forum topic"
              className="inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded-xl text-white font-semibold transition-all shadow-md hover:shadow-lg"
              onClick={() => navigate("/ForumCreate")}
            >
              <Plus className="w-5 h-5 mr-2" />
              New Topic
            </button>
          </div>
        </div>
      </div>
      
      {/* Category Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex overflow-x-auto gap-2 py-2 scrollbar-hide">
          {['All', 'General', 'Academics', 'Campus Life', 'Events', 'Career'].map(category => (
            <button
              key={category}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === 'All' 
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
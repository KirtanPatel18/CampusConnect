import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, MessageSquare, ArrowRight } from "react-feather";

const resourcesData = [
  { title: "Data Structures & Algorithms Notes", type: "PDF", downloads: 234 },
  { title: "Machine Learning Project Examples", type: "ZIP", downloads: 187 },
  { title: "Calculus II Practice Problems", type: "PDF", downloads: 312 },
];

const forumsData = [
  {
    title: "Tips for Balancing Academics and Extracurriculars",
    replies: 24,
    category: "Student Life",
  },
  {
    title: "Internship Opportunities for CS Students",
    replies: 18,
    category: "Career",
  },
  {
    title: "Study Group for Advanced Physics",
    replies: 9,
    category: "Academics",
  },
];

// Resource card component
const ResourceCard = ({ resource, handleResouceDownload }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center">
        <BookOpen className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="font-medium text-gray-900">{resource.title}</p>
        <p className="text-xs text-gray-500">
          {resource.type} • {resource.downloads} downloads
        </p>
      </div>
    </div>
    <button
      type="button"
      className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded px-3 py-1 text-sm font-semibold transition"
      onClick={handleResouceDownload}
    >
      Download
    </button>
  </div>
);

// Forum card component
const ForumCard = ({ topic, handleForumJoin }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
        <MessageSquare className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="font-medium text-gray-900">{topic.title}</p>
        <p className="text-xs text-gray-500">
          {topic.category} • {topic.replies} replies
        </p>
      </div>
    </div>
    <button
      type="button"
      className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded px-3 py-1 text-sm font-semibold transition"
      onClick={handleForumJoin}
    >
      Join
    </button>
  </div>
);

const ResourcesAndForumsSection = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleResouceDownload = () => {
    if (!isLoggedIn) navigate("/login");
  };

  const handleForumJoin = () => {
    if (!isLoggedIn) navigate("/login");
  };

  return (
    <section className="py-20 bg-[#f8f9fa]">
      <div className="container mx-auto max-w-8xl px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Resources */}
          <div id="resources" className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-teal-100 rounded-full z-0"></div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
                RESOURCES
              </span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Academic Resources
              </h2>
              <p className="text-gray-600 mb-8">
                Access study materials, lecture notes, and past papers shared by
                your peers and professors.
              </p>
              <div className="space-y-4">
                {resourcesData.map((resource, index) => (
                  <ResourceCard
                    key={index}
                    resource={resource}
                    handleResouceDownload={handleResouceDownload}
                  />
                ))}
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="flex items-center border border-teal-600 text-teal-600 hover:bg-teal-50 rounded px-4 py-2 font-semibold transition"
                  onClick={() => !isLoggedIn ? navigate("/login") : alert("resource")}
                >
                  Browse All Resources
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Forums */}
          <div id="forums" className="relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-100 rounded-full z-0"></div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
                FORUMS
              </span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Active Discussions
              </h2>
              <p className="text-gray-600 mb-8">
                Join conversations, ask questions, and share your knowledge with
                the campus community.
              </p>
              <div className="space-y-4">
                {forumsData.map((topic, index) => (
                  <ForumCard
                    key={index}
                    topic={topic}
                    handleForumJoin={handleForumJoin}
                  />
                ))}
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="flex items-center border border-orange-600 text-orange-600 hover:bg-orange-50 rounded px-4 py-2 font-semibold transition"
                  onClick={() => !isLoggedIn ? navigate("/login") : alert("forum")}
               >
                  View All Discussions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesAndForumsSection;

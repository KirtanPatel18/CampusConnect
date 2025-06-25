"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, X, BookOpen } from "lucide-react";

// Forum categories
const forumCategories = [
  {
    id: "academic-discussion",
    name: "Academic Discussion",
    description:
      "Share study tips, discuss coursework, and collaborate on academic projects",
    icon: "📚",
  },
  {
    id: "campus-events",
    name: "Campus Events",
    description:
      "Discuss upcoming events, share experiences, and plan activities",
    icon: "🎉",
  },
  {
    id: "career-internships",
    name: "Career & Internships",
    description: "Job opportunities, career advice, and internship experiences",
    icon: "💼",
  },
  {
    id: "student-life",
    name: "Student Life",
    description:
      "General discussions about campus life, housing, and student experiences",
    icon: "🏫",
  },
  {
    id: "tech-programming",
    name: "Tech & Programming",
    description: "Coding help, tech discussions, and project collaborations",
    icon: "💻",
  },
  {
    id: "buy-sell",
    name: "Buy & Sell",
    description:
      "Marketplace for textbooks, electronics, and other student items",
    icon: "🛒",
  },
];

export const ForumCreate = () => {
  const navigate = useNavigate();
  //   const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, category: value }));
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    } else if (formData.content.length < 20) {
      newErrors.content = "Content must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createDiscussion = async () => {
    try {

      const response = await fetch(
        "http://localhost:5000/api/v1/forum/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    await createDiscussion();
    navigate("/ForumsPage");
  };

  const handleCancel = () => {
    if (formData.title || formData.content) {
      if (confirm("Are you sure you want to discard your draft?")) {
        navigate("/ForumsPage");
      }
    } else {
      navigate("/ForumsPage");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Modern Header */}
      <div className="bg-gradient-to-r bg-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
              aria-label="Back to forums"
            >
              <ArrowLeft className="h-5 w-5 text-black" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-black">
                Create New Discussion
              </h1>
              <p className="text-black mt-1 max-w-lg">
                Share your thoughts, questions, or ideas with the community
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form - Modern Card */}
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-200">
                <header className="pb-2 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                      <BookOpen size={20} />
                    </span>
                    Discussion Details
                  </h2>
                </header>

                {/* Title - Modern Input */}
                <div className="space-y-2">
                  <label htmlFor="title" className="font-medium text-gray-700">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter a descriptive title for your discussion"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                      errors.title
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600 font-medium flex items-center gap-1">
                      <X size={16} /> {errors.title}
                    </p>
                  )}
                </div>

                {/* Category - Enhanced Select */}
                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="font-medium text-gray-700"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleCategoryChange}
                      className={`w-full appearance-none border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 pr-10 ${
                        errors.category
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                      }`}
                    >
                      <option value="" disabled className="text-gray-400">
                        Select a category
                      </option>
                      {forumCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                  {errors.category && (
                    <p className="text-sm text-red-600 font-medium flex items-center gap-1">
                      <X size={16} /> {errors.category}
                    </p>
                  )}
                </div>

                {/* Content - Improved Textarea */}
                <div className="space-y-2">
                  <label
                    htmlFor="content"
                    className="font-medium text-gray-700"
                  >
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    placeholder="Write your discussion content here..."
                    value={formData.content}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-3 min-h-[200px] focus:outline-none focus:ring-2 ${
                      errors.content
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                  />
                  {errors.content && (
                    <p className="text-sm text-red-600 font-medium flex items-center gap-1">
                      <X size={16} /> {errors.content}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Tip: Use clear paragraphs and be specific to get better
                    responses.
                  </p>
                </div>
              </section>
            </div>

            {/* Sidebar - Modern Cards */}
            <aside className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm p-5 border border-blue-100">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-blue-500 p-2 rounded-lg text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Posting Guidelines
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Ensure your post follows community rules
                    </p>
                  </div>
                </div>
                <ul className="space-y-2.5 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="text-blue-500 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Be respectful and courteous</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="text-blue-500 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Stay on topic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="text-blue-500 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>No spam or self-promotion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="text-blue-500 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Use appropriate language</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="text-blue-500 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Search before posting</span>
                  </li>
                </ul>
              </div>

              {/* Submit Button - Modern Design */}
              <section>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3.5 font-semibold rounded-xl shadow-md transition-all ${
                    isSubmitting
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white hover:shadow-lg"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0H5a1 1 0 00-1 1v4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span className="font-bold">Create Discussion</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 font-medium text-gray-700 hover:text-gray-900 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </section>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
};

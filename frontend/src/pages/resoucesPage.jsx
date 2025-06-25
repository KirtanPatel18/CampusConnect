import React, { useEffect, useState } from "react";
import { ResourcesList } from "../components/resourcesModule/ResourceList";
import { ResourceFilterBar } from "../components/resourcesModule/ResourceFilterBar";
import { ResourceUploadModal } from "../components/resourcesModule/ResouceUploadModal";
import { Footer } from "../components/footer.jsx";
import { mockCategories } from "../data/mockData.js";
import { Header } from "../components/header.jsx";

export const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [categories] = useState(mockCategories);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const fetchData = async () => {
    try {
      const resourcesRes = await fetch("http://localhost:5000/api/v1/resources");
      const resourcesData = await resourcesRes.json();
      console.log(resourcesData);
      setResources(resourcesData.resources);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleUploadResource = (newResource) => {
    setResources([newResource, ...resources]);
    setShowUploadModal(false);
  };

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      selectedCategory === "all" || resource.categoryId === selectedCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
    <Header/>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Academic Resources
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Browse and share study materials, notes, and past papers
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Upload Resource
        </button>
      </div>

      <ResourceFilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />

      <ResourcesList resources={filteredResources} />

      {showUploadModal && (
        <ResourceUploadModal
          categories={categories}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUploadResource}
        />
      )}

    </div>
<Footer/>
</>

  );
};

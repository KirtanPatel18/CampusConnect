import React from 'react';
import { ResourceCard } from './ResourceCard';

export const ResourcesList = ({ resources }) => {
  if (resources.length === 0) {
    return (
      <div className="mt-12 text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-lg">No resources found matching your criteria.</p>
        <p className="text-gray-400 mt-2">Try adjusting your filters or upload a new resource.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
};

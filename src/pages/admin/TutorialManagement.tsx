import React from 'react';
import { Tutorial } from '../../types';

const mockTutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Best Practices for Referrals',
    description: 'Tips and tricks to make successful referrals and increase your conversion rate',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

export default function TutorialManagement() {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Tutorial Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Add and manage tutorial videos for users
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Tutorial
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockTutorials.map((tutorial) => (
          <div
            key={tutorial.id}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">{tutorial.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{tutorial.description}</p>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  className="text-red-600 hover:text-red-900 text-sm font-medium"
                  onClick={() => {/* Add edit logic */}}
                >
                  Edit
                </button>
                <button
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                  onClick={() => {/* Add delete logic */}}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
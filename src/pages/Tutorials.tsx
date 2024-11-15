import React from 'react';
import { Tutorial } from '../types';

const mockTutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Best Practices for Referrals',
    description: 'Tips and tricks to make successful referrals and increase your conversion rate',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '2',
    title: 'Understanding Compensation',
    description: 'A detailed guide on how the compensation system works',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '3',
    title: 'Using the Dashboard Effectively',
    description: 'Learn how to interpret dashboard metrics and track your performance',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

export default function Tutorials() {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Tutorials</h1>
          <p className="mt-2 text-sm text-gray-700">
            Watch these tutorials to learn how to make the most of the referral program
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockTutorials.map((tutorial) => (
          <div
            key={tutorial.id}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={tutorial.videoUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">{tutorial.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{tutorial.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
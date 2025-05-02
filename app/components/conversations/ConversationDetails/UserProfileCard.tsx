'use client';

interface UserProfileCardProps {
  name: string;
  email: string;
  location: string;
  avatar?: string;
}

export default function UserProfileCard({ name, email, location, avatar }: UserProfileCardProps) {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        {avatar ? (
          <img src={avatar} alt={name} className="w-16 h-16 rounded-full" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-2xl font-medium text-blue-600">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* User Info */}
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{name}</h3>
          <div className="mt-1 space-y-1">
            <div className="flex items-center text-sm text-gray-500">
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {email}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

interface AdditionalInfoProps {
  company: string;
  role: string;
}

export default function AdditionalInfo({ company, role }: AdditionalInfoProps) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Additional info</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Company:</span>
          <span className="text-sm font-medium text-gray-900">{company}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Role:</span>
          <span className="text-sm font-medium text-gray-900">{role}</span>
        </div>
      </div>
    </div>
  );
} 
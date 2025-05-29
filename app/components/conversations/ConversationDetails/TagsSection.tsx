'use client';

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface TagsSectionProps {
  tags: Tag[];
}

export default function TagsSection({ tags }: TagsSectionProps) {
  const getTagColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-800';
      case 'gray':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4">
      <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-3 sm:mb-4">Tags</h3>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${getTagColor(
              tag.color
            )}`}
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
} 
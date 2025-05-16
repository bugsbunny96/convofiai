import { DocumentIcon, QuestionMarkCircleIcon, LinkIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';

export interface KnowledgeBaseItem {
  id: string;
  name: string;
  type: 'Document' | 'Faq' | 'Link';
  tags: string[];
  assignedTo: string[];
  date: string;
}

interface KnowledgeBaseTableProps {
  items: KnowledgeBaseItem[];
  renderActions?: (item: KnowledgeBaseItem) => React.ReactNode;
}

const typeIcon = {
  Document: <DocumentIcon className="h-5 w-5 text-primary" />,
  Faq: <QuestionMarkCircleIcon className="h-5 w-5 text-green-500" />,
  Link: <LinkIcon className="h-5 w-5 text-purple-500" />,
};

export default function KnowledgeBaseTable({ items, renderActions }: KnowledgeBaseTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl text-gray-800 font-semibold mb-6">Knowledge Base</h1>
      <p className="text-gray-500 mb-6">All items in your knowledge base</p>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-md">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Tags</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Assigned to</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {items.map(item => (
            <tr key={item.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                {typeIcon[item.type]}
                <span className="text-sm font-medium text-gray-900">{item.name}</span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold border border-gray-200">
                  {item.type}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex flex-wrap gap-1">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex flex-wrap gap-1">
                  {item.assignedTo.map(assignee => (
                    <span key={assignee} className="px-2 py-0.5 rounded-full bg-primary text-white text-xs font-medium">
                      {assignee}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
              <td className="px-4 py-4 whitespace-nowrap text-right">
                {renderActions ? renderActions(item) : (
                  <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary">
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
                    <span className="sr-only">Actions</span>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 
import React from 'react';

/**
 * TableSkeleton renders skeleton rows for loading states in tables.
 * @param rowCount Number of skeleton rows
 * @param colCount Number of columns per row
 */
export interface TableSkeletonProps {
  rowCount?: number;
  colCount?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rowCount = 5, colCount = 7 }) => (
  <>
    {Array.from({ length: rowCount }).map((_, idx) => (
      <tr key={idx} className="animate-pulse">
        {Array.from({ length: colCount }).map((_, cidx) => (
          <td key={cidx} className="px-4 py-3">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
          </td>
        ))}
      </tr>
    ))}
  </>
);

export default TableSkeleton; 
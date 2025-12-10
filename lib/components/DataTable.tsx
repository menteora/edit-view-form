import React from 'react';
import { LoaderCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  error?: string | null;
  pagination?: {
    page: number;
    total: number;
    limit: number;
    onPageChange: (newPage: number) => void;
  };
}

export function DataTable<T extends { id: string | number }>({ 
    data, 
    columns, 
    onRowClick, 
    isLoading, 
    error,
    pagination 
}: DataTableProps<T>) {
    
    const totalPages = pagination ? Math.ceil(pagination.total / pagination.limit) : 0;

    return (
        <div className="md:bg-card-light md:dark:bg-card-dark md:rounded-xl md:shadow-lg md:border md:border-gray-200 md:dark:border-gray-700">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 hidden md:table-header-group">
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={idx} scope="col" className={`px-6 py-3 ${col.className || ''}`}>
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="block md:table-row-group space-y-4 md:space-y-0">
                        {isLoading && (
                             <tr className="block md:table-row bg-card-light dark:bg-card-dark rounded-lg shadow-sm md:shadow-none border md:border-0 dark:border-gray-700">
                                <td colSpan={columns.length} className="block md:table-cell p-4">
                                    <div className="flex items-center justify-center h-64">
                                        <LoaderCircle className="animate-spin h-12 w-12 text-accent-500" />
                                    </div>
                                </td>
                            </tr>
                        )}
                        {error && !isLoading && (
                            <tr className="block md:table-row bg-card-light dark:bg-card-dark rounded-lg shadow-sm md:shadow-none border md:border-0 dark:border-gray-700">
                                <td colSpan={columns.length} className="block md:table-cell">
                                    <div className="flex items-center justify-center h-64 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-lg md:rounded-none">
                                        <p>{error}</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {!isLoading && !error && data.map((item) => (
                            <tr 
                                key={item.id} 
                                className={`block md:table-row bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-none md:border-x-0 md:border-t-0 md:border-b shadow-sm md:shadow-none transition-colors ${onRowClick ? 'hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer' : ''}`}
                                onClick={() => onRowClick && onRowClick(item)}
                                role={onRowClick ? "button" : undefined}
                                tabIndex={onRowClick ? 0 : undefined}
                                onKeyDown={(e) => onRowClick && e.key === 'Enter' && onRowClick(item)}
                            >
                                {columns.map((col, idx) => (
                                    <td key={idx} className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 md:border-none flex justify-between items-center md:table-cell">
                                        <span className="font-semibold text-gray-700 dark:text-gray-300 md:hidden mr-4">
                                            {col.header}:
                                        </span>
                                        <span className="text-right md:text-left flex-1 md:flex-none">
                                            {typeof col.accessor === 'function' 
                                                ? col.accessor(item) 
                                                : (item[col.accessor] as React.ReactNode)}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {!isLoading && !error && data.length === 0 && (
                            <tr className="block md:table-row bg-card-light dark:bg-card-dark rounded-lg shadow-sm md:shadow-none">
                                <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500 block md:table-cell">
                                    Nessun dato disponibile
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {pagination && (
                <div className="flex items-center justify-between p-4 border-t dark:border-gray-700 bg-card-light dark:bg-card-dark md:bg-transparent rounded-b-xl md:rounded-none mt-4 md:mt-0 shadow-sm md:shadow-none">
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                        Pagina <span className="font-semibold">{pagination.page}</span> di <span className="font-semibold">{totalPages}</span>
                    </span>
                    <div className="inline-flex items-center gap-2">
                        <button
                            onClick={() => pagination.onPageChange(pagination.page - 1)}
                            disabled={pagination.page <= 1}
                            className="p-2 rounded-md bg-gray-100 dark:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-500"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => pagination.onPageChange(pagination.page + 1)}
                            disabled={pagination.page >= totalPages}
                            className="p-2 rounded-md bg-gray-100 dark:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-500"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
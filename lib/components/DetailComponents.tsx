import React from 'react';
import { LoaderCircle, Save, Edit } from 'lucide-react';

export const defaultInputClass = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent-500 focus:border-accent-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white";

export const Section: React.FC<{
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    isEditing?: boolean;
    isSaving?: boolean;
    onEditClick?: () => void;
    onSave?: () => void;
    onCancel?: () => void;
    editButtonText?: string;
    saveButtonText?: string;
}> = ({ 
    title, 
    icon: Icon, 
    children, 
    isEditing, 
    isSaving, 
    onEditClick, 
    onSave, 
    onCancel, 
    editButtonText = "Modifica", 
    saveButtonText = "Salva" 
}) => {
    return (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <header className="flex justify-between items-center p-4">
                <h3 className="font-bold text-lg flex items-center gap-2 text-text-light dark:text-text-dark">
                    <Icon className="h-5 w-5 text-accent-500"/>
                    {title}
                </h3>
                {onEditClick && !isEditing && (
                    <button 
                        onClick={onEditClick}
                        className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-semibold text-accent-500 rounded-md hover:bg-accent-500/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 dark:focus:ring-offset-gray-800 transition-colors"
                    >
                        <Edit className="h-4 w-4" />
                        {editButtonText}
                    </button>
                )}
            </header>
            <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                {children}
            </div>
            {isEditing && onSave && onCancel && (
                <footer className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-600">
                    <button onClick={onCancel} className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        Annulla
                    </button>
                    <button
                        onClick={onSave}
                        disabled={isSaving}
                        className="flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-accent-500 rounded-md hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 disabled:bg-gray-400 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800 transition-colors"
                    >
                        {isSaving ? <LoaderCircle className="animate-spin h-5 w-5" /> : <><Save className="h-4 w-4 mr-2"/>{saveButtonText}</>}
                    </button>
                </footer>
            )}
        </div>
    );
};

export const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: React.ReactNode }) => (
    <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 text-accent-500 mt-1 flex-shrink-0" />
        <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{label}</p>
            <div className="text-base text-text-light dark:text-text-dark">{value || 'N/D'}</div>
        </div>
    </div>
);

export const EditField = ({ label, id, children }: { label: string, id: string, children?: React.ReactNode }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
        </label>
        {children}
    </div>
);
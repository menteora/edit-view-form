import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './hooks/useTheme';
import { DataTable, Column } from '../lib/components/DataTable';
import { Modal } from '../lib/components/Modal';
import { Section, DetailItem, EditField, defaultInputClass } from '../lib/components/DetailComponents';
import { User, DUMMY_USERS } from './dummyData';
import { User as UserIcon, Mail, Shield, Activity, Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? <Moon className="h-6 w-6 text-gray-800" /> : <Sun className="h-6 w-6 text-yellow-500" />}
        </button>
    );
};

const UserDetails: React.FC<{ user: User, onUpdate: (u: User) => void }> = ({ user, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editData, setEditData] = useState<User>(user);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            onUpdate(editData);
            setIsEditing(false);
            setIsSaving(false);
        }, 800);
    };

    const handleCancel = () => {
        setEditData(user);
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <Section
                title="Informazioni Utente"
                icon={UserIcon}
                isEditing={isEditing}
                isSaving={isSaving}
                onEditClick={() => setIsEditing(true)}
                onSave={handleSave}
                onCancel={handleCancel}
            >
                {isEditing ? (
                    <div className="space-y-4">
                        <EditField label="Nome" id="name">
                            <input 
                                id="name" 
                                value={editData.name} 
                                onChange={e => setEditData({...editData, name: e.target.value})} 
                                className={defaultInputClass} 
                            />
                        </EditField>
                        <EditField label="Email" id="email">
                            <input 
                                id="email" 
                                value={editData.email} 
                                onChange={e => setEditData({...editData, email: e.target.value})} 
                                className={defaultInputClass} 
                            />
                        </EditField>
                        <EditField label="Ruolo" id="role">
                            <select 
                                id="role" 
                                value={editData.role} 
                                onChange={e => setEditData({...editData, role: e.target.value})}
                                className={defaultInputClass}
                            >
                                <option>Admin</option>
                                <option>User</option>
                                <option>Editor</option>
                            </select>
                        </EditField>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        <DetailItem icon={UserIcon} label="Nome" value={user.name} />
                        <DetailItem icon={Mail} label="Email" value={user.email} />
                        <DetailItem icon={Shield} label="Ruolo" value={user.role} />
                        <DetailItem 
                            icon={Activity} 
                            label="Stato" 
                            value={<span className={`px-2 py-1 rounded text-xs font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{user.status}</span>} 
                        />
                    </div>
                )}
            </Section>
        </div>
    );
};

const AppContent: React.FC = () => {
    const [users, setUsers] = useState<User[]>(DUMMY_USERS);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const columns: Column<User>[] = [
        { header: 'ID', accessor: 'id' },
        { header: 'Nome', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { 
            header: 'Stato', 
            accessor: (u) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${u.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {u.status}
                </span>
            ) 
        },
    ];

    const handleUserUpdate = (updatedUser: User) => {
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        setSelectedUser(updatedUser);
    };

    // Pagination logic
    const totalUsers = users.length;
    const paginatedUsers = users.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="min-h-screen bg-bkg-light dark:bg-bkg-dark text-text-light dark:text-text-dark transition-colors duration-300">
             <header className="sticky top-0 z-10 w-full bg-card-light/95 dark:bg-card-dark/95 backdrop-blur-sm shadow-md transition-colors p-4">
                 <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Library Demo App</h1>
                    <ThemeToggle />
                 </div>
             </header>

             <main className="p-4 sm:p-6 lg:p-8">
                <div className="max-w-5xl mx-auto space-y-6">
                    <DataTable 
                        title="Lista Utenti"
                        data={paginatedUsers}
                        columns={columns}
                        onRowClick={(user) => setSelectedUser(user)}
                        pagination={{
                            page: currentPage,
                            total: totalUsers,
                            limit: itemsPerPage,
                            onPageChange: handlePageChange
                        }}
                    />
                </div>
             </main>

             <Modal 
                isOpen={!!selectedUser} 
                onClose={() => setSelectedUser(null)}
                title={`Dettaglio Utente #${selectedUser?.id}`}
             >
                {selectedUser && (
                    <UserDetails user={selectedUser} onUpdate={handleUserUpdate} />
                )}
             </Modal>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
};

export default App;
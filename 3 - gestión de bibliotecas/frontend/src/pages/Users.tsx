import { useEffect, useState } from 'react';
import type { User } from '../types';
import { api } from '../services/api';
import { UserTable } from '../components/UserTable';
import { BookListModal } from '../components/BookListModal';
import { CreateUserModal } from '../components/CreateUserModal';

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [dialog, setDialog] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    const res = await api.get('/api/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleShowBooks = (user: User) => {
    setSelectedUser(user);
    setDialog(true);
  };

  const handleCreateUser = () => {
    setCreateModal(true);
  };

  const handleUserCreated = () => {
    fetchUsers();
  };

  const functions = {
    showBooks: handleShowBooks
  };

  const header = [
    { name: 'Miembro', key: 'member' },
    { name: 'Email', key: 'email' },
    { name: 'Libros Prestados', key: 'borrowedBooks' },
    { name: 'Acciones', key: 'actions' }
  ];

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-white'>Gestión de Usuarios</h1>
        <button 
          className='px-4 py-2 bg-orange-500 rounded text-white flex gap-2 cursor-pointer'
          onClick={handleCreateUser}
        >
          Añadir nuevo usuario
        </button>
      </div>
      <UserTable 
        header={header} 
        data={users} 
        functions={functions}
      />
      <BookListModal 
        isOpen={dialog} 
        onClose={() => {
          setDialog(false);
          setSelectedUser(null);
        }}
        books={selectedUser?.borrowedBooks || []}
      />
      <CreateUserModal 
        isOpen={createModal} 
        onClose={() => setCreateModal(false)}
        onCreated={handleUserCreated}
      />
    </div>
  );
};
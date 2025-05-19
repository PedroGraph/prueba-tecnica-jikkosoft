import { useEffect, useState } from 'react';
import type { Book, User } from '../types';
import { api } from '../services/api';
import { BookTable } from '../components/BookTable';
import { PlusCircle } from 'lucide-react';
import { UserSearchModal } from '../components/UserSearchModal';
import { CreateBookModal } from '../components/CreateBookModal';

export const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [dialog, setDialog] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = async () => {
    const res = await api.get('/api/books');
    setBooks(res.data);
  };

  const fetchUsers = async () => {
    const res = await api.get('/api/users');
    setAllUsers(res.data);
    setFilteredUsers(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBorrowBook = async (id: number) => {
    setSelectedBookId(id);
    await fetchUsers();
    setDialog(true);
  };

  const handleReturnBook = async (id: number, user: number) => {
    try {
      const res = await api.post(`/api/books/${id}/return`, { user });
      if (res.status === 200) {
        fetchBooks();
      }
    } catch (error) {
      console.error('Error al devolver libro:', error);
    }
  };

  const handleCreateBook = () => {
    setCreateModal(true);
  };

  const handleBookCreated = () => {
    fetchBooks();
  };

  const handleUserSelect = async (userId: number) => {
    if (!selectedBookId) return;
    
    try {
      const res = await api.post(`/api/books/${selectedBookId}/borrow`, { user: userId });
      if (res.status === 200) {
        fetchBooks();
        setDialog(false);
        setSelectedBookId(null);
      }
    } catch (error) {
      console.error('Error al prestar libro:', error);
    }
  };

  const functions = {
    borrow: handleBorrowBook,
    return: handleReturnBook
  };

  const header = [
    { name: 'ID', key: 'id' },
    { name: 'Título', key: 'title' },
    { name: 'Autor', key: 'author' },
    { name: 'Estado', key: 'status' },
    { name: 'Prestado a', key: 'borrowedBy' },
    { name: 'Acciones', key: 'actions' }
  ];

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-white'>Gestión de Libros</h1>
        <button 
          className='px-4 py-2 bg-orange-500 rounded text-white flex gap-2 cursor-pointer'
          onClick={handleCreateBook}
        >
          <PlusCircle /> Añadir nuevo libro
        </button>
      </div>
      <BookTable 
        header={header} 
        data={books} 
        functions={functions}
      />
      <UserSearchModal 
        isOpen={dialog} 
        onClose={() => {
          setDialog(false);
          setSelectedBookId(null);
        }}
        onUserSelect={handleUserSelect}
        users={allUsers}
      />
      <CreateBookModal 
        isOpen={createModal} 
        onClose={() => setCreateModal(false)}
        onCreated={handleBookCreated}
      />
    </div>
  );
};

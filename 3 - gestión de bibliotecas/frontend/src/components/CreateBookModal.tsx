import { useState } from 'react';
import { api } from '../services/api';
import { CreateModal } from './CreateModal';

interface CreateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export const CreateBookModal: React.FC<CreateBookModalProps> = ({
  isOpen,
  onClose,
  onCreated
}) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    available: true,
    borrowedBy: null
  });
  const [error, setError] = useState<Boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/books', formData);
      setError(false);
      onCreated();
      onClose();
      setFormData({
        title: '',
        author: '',
        available: true,
        borrowedBy: null
      });
    } catch (error) {
      setError(true);
      console.error('Error al crear libro:', error);
    }
  };

  return (
    <CreateModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Añadir Libro"
    >
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className='mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            required
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Autor</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className='mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            required
          />
        </div>
       
        <button
          type="submit"
          className='px-4 py-2 bg-orange-500 rounded text-white hover:bg-orange-600'
        >
          Añadir Libro
        </button>
        {error && (
          <span className='text-red-500 p-4 mb-auto'>Este libro ya existe</span>
        )}
      </form>
    </CreateModal>
  );
};

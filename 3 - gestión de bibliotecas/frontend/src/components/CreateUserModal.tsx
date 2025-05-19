import { useState } from 'react';
import type { User } from '../types';
import { api } from '../services/api';
import { CreateModal } from './CreateModal';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onCreated
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    borrowedBooks: []
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
      await api.post('/api/users', formData);
      onCreated();
      onClose();
      setFormData({
        name: '',
        email: '',
        borrowedBooks: []
      })
    } catch (error) {
      setError(true);
      console.error('Error al crear usuario:', error);
    }
  };

  return (
    <CreateModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Crear Usuario"
    >
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            required
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            required
          />
        </div>
        <button
          type="submit"
          className='px-4 py-2 bg-orange-500 rounded text-white hover:bg-orange-600'
        >
          Crear Usuario
        </button>
        {error && (
          <span className='text-red-500 p-4 mb-auto'>Este email ya está registrado</span>
        )}
      </form>
    </CreateModal>
  );
};

import type { User } from '../types';
import { useState, useEffect } from 'react';
import { UserCard } from './UserCard';

interface UserSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserSelect: (userId: number) => void;
  users: User[];
}

export const UserSearchModal: React.FC<UserSearchModalProps> = ({
  isOpen,
  onClose,
  onUserSelect,
  users
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term)
      );
      setFilteredUsers(filtered);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='bg-white p-4 rounded min-w-[500px] flex flex-col gap-8'>
        <h1 className='text-xl'>Prestar libro</h1>
        <input 
          type="text" 
          className='bg-white py-1 rounded px-4 border-1' 
          placeholder="Buscar miembro..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className='flex flex-col gap-2'>
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onSelect={onUserSelect} />
          ))}
        </div>
        <button 
            className='absolute top-2 right-2 p-2 h-8 w-8 flex justify-center items-center hover:bg-gray-300 cursor-pointer rounded-full'
            onClick={onClose}
          >
            X
          </button>
      </div>
    </div>
  );
};

import type { User } from '../types';

interface UserCardProps {
  user: User;
  onSelect: (userId: number) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onSelect }) => {
  return (
    <div 
      className='flex p-2 justify-between w-full cursor-pointer hover:bg-gray-200 hover:rounded'
      onClick={() => onSelect(user.id)}
    >
      <div className='flex gap-4'>
        <span className='flex justify-center items-center rounded-full bg-amber-700 text-orange-400 h-8 w-8'>
          {user.name.split("")[0]}
        </span>
        <div className='flex flex-col'>
          <span className='text-sm'>{user.name}</span>
          <span className='text-xs'>{user.email}</span>
        </div>
      </div>
      <span className={`text-sm ${user.borrowedBooks.length > 0 && "bg-amber-600"} p-1 rounded-full h-8 w-16 text-center text-white`}>
        {user.borrowedBooks.length > 0 ? `${user.borrowedBooks.length} libros` : '' }
      </span>
    </div>
  );
};

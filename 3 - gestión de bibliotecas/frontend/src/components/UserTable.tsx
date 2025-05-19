import type { JSX } from 'react';
import type { User } from '../types';
import { useState } from 'react';

interface TableHeader {
  name: string;
  key: string;
}

interface UserTableProps {
  header: TableHeader[];
  data: User[];
  functions: {
    showBooks: (user: User) => void;
  };
}

export const UserTable: React.FC<UserTableProps> = ({ header, data, functions }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(user => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchTermLower) ||
      user.email.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <div className='overflow-x-auto'>
      <div className='flex justify-between items-center mb-4'>
        <input 
          type="text" 
          className='bg-white py-1 rounded px-4' 
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className='min-w-full border border-gray-600'>
        <thead>
          <tr className='bg-scale-600'>
            {header.map((col) => (
              <th key={col.key} className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-gray-600 divide-y divide-gray-200'>
          {filteredData && filteredData.map((user) => (
            <tr key={user.id}>
              <td className='px-6 py-4whitespace-nowrap text-sm text-gray-100 flex gap-2'>
                <span className='h-6 w-6 bg-amber-600 text-orange-200 p-1 rounded-full flex justify-center items-center'>{user.name.split("")[0]}</span>{user.name}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100'>{user.email}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100 flex gap-2'>
                {user.borrowedBooks.length > 0 && (<span className='h-6 w-6 bg-amber-700 text-orange-400 flex justify-center items-center rounded-full p-1'>{user.borrowedBooks.length}</span>)} 
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-left text-sm font-medium'>
                <button
                  onClick={() => {
                      functions.showBooks(user);
                  }}
                  className='text-orange-600 hover:text-orange-100 mr-4 cursor-pointer'
                >
                  Ver Libros
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
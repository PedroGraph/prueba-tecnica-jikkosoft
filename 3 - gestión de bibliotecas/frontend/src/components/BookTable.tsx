import type { JSX } from 'react';
import type { Book } from '../types';
import { useState } from 'react';

interface TableHeader {
  name: string;
  key: string;
}

interface BookTableProps {
  header: TableHeader[];
  data: Book[];
  functions: {
    borrow: (id: number) => void;
    return: (id: number, user: number) => void;
  };
}

export const BookTable: React.FC<BookTableProps> = ({ header, data, functions }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(book => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchTermLower) ||
      book.author.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <div className='overflow-x-auto'>
      <div className='flex justify-between items-center mb-4'>
        <input 
          type="text" 
          className='bg-white py-1 rounded px-4' 
          placeholder="Buscar libro..."
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
          {filteredData && filteredData.map((book) => (
            <tr key={book.id}>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100'>{book.id}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100'>{book.title}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100'>{book.author}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100'>
                <span className={`w-1/2 px-2 py-1 rounded-full ${book.available ? "bg-green-300 text-green-700": "bg-orange-400 text-orange-50"}`}>{book.available ? "Disponible" : "Prestado"}</span>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100 flex gap-2'>
                {book.borrowedBy?.name && (<span className='h-6 w-6 bg-amber-700 text-orange-400 flex justify-center items-center rounded-full p-1'>{book.borrowedBy?.name?.split("")[0]}</span>)} {book.borrowedBy?.name || ''}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                <button
                  onClick={() => {
                    if (book.available) {
                      functions.borrow(book.id);
                    } else if (book.borrowedBy?.id) {
                      functions.return(book.id, book.borrowedBy.id);
                    }
                  }}
                  className='text-orange-600 hover:text-orange-100 mr-4 cursor-pointer'
                >
                  {book.available ? "Prestar" : "Devolver"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
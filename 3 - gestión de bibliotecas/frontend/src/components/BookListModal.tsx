import type { Book } from '../types';

interface BookListModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: Book[];
}

export const BookListModal: React.FC<BookListModalProps> = ({
  isOpen,
  onClose,
  books
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='bg-white p-4 rounded min-w-[500px] flex flex-col gap-8'>
        <h1 className='text-xl'>Libros Prestados</h1>
        <div className='flex flex-col gap-2'>
          {books.map((book) => (
            <div key={book.id} className='flex p-2 justify-between w-full hover:bg-gray-200 hover:rounded'>
              <div className='flex gap-4'>
                <span className='flex justify-center items-center rounded-full bg-amber-700 text-orange-400 h-8 w-8'>
                  {book.title.split("")[0]}
                </span>
                <div className='flex flex-col'>
                  <span className='text-sm'>{book.title}</span>
                  <span className='text-xs'>{book.author}</span>
                </div>
              </div>
              <span className={`text-sm ${book.available && "bg-green-300 text-green-700"} p-1 rounded-full h-8 w-16 text-center text-white`}>
                {book.available ? "Disponible" : "Prestado"}
              </span>
            </div>
          ))}
        </div>
        <button 
          className='px-4 py-2 bg-orange-500 rounded text-white hover:bg-orange-900 cursor-pointer'
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

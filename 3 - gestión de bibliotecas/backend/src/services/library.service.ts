import { Book } from "../interfaces/Book";
import { books, users } from "../seeders/books";

export const libraryService = {
    addBook(book: Omit<Book, 'id' | 'available'>): Book {
        const titleLower = book.title.toLowerCase().trim();
        const authorLower = book.author.toLowerCase().trim();

        const existingBook = books.find(b => 
            b.title.toLowerCase().trim() === titleLower && 
            b.author.toLowerCase().trim() === authorLower
        );

        if (existingBook) {
            throw ('Ya existe un libro con este título y autor');
        }

        const newBook: Book = {
            id: books.length + 1,
            title: titleLower,
            author: authorLower,
            available: true,
            borrowedBy: null
        };
        books.push(newBook);
        return newBook;
    },

    getAllBooks(): Book[] {
        return books;
    },

    borrowBook(id: number, userId: number): boolean {
       if(!id || !userId) return false;
       const book = books.find(b => b.id === id);
       if (book && book.available) {
           book.available = false;
           const user = users.find(u => u.id === userId);
           if (user) {
               user.borrowedBooks.push(book);
               book.borrowedBy = {
                id: user.id,
                name: user.name
               }
           }
           
           return true;
       }
       return false;
   },

   returnBook(id: number, userId: number): boolean {
       const book = books.find(b => b.id === id);
       if (book && !book.available) {
           book.available = true;
           book.borrowedBy = null;
           const user = users.find(u => u.id === userId);
           if (user && user.borrowedBooks) {
             user.borrowedBooks = user.borrowedBooks.filter(b => b.id !== book.id);
           }
           return true;
       }
       return false;
   }
};

import { Book } from "../interfaces/Book";
import { books, users } from "../seeders/books";

class LibraryService {
    private static instance: LibraryService;
    private constructor() {}

    static getInstance(): LibraryService {
        if (!LibraryService.instance) {
            LibraryService.instance = new LibraryService();
        }
        return LibraryService.instance;
    }

    addBook(book: Omit<Book, 'id' | 'available'>): Book {
        const titleLower = book.title.toLowerCase().trim();
        const authorLower = book.author.toLowerCase().trim();

        const existingBook = books.find(b => 
            b.title.toLowerCase().trim() === titleLower && 
            b.author.toLowerCase().trim() === authorLower
        );

        if (existingBook) {
            throw new Error('Ya existe un libro con este título y autor');
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
    }

    getAllBooks(): Book[] {
        return books;
    }

    getBookById(id: number): Book | null {
        return books.find(b => b.id === id) || null;
    }

    updateBook(id: number, bookData: Partial<Book>): Book | null {
        const bookIndex = books.findIndex(b => b.id === id);
        if (bookIndex === -1) return null;

        books[bookIndex] = {
            ...books[bookIndex],
            ...bookData
        };

        return books[bookIndex];
    }

    deleteBook(id: number): boolean {
        const bookIndex = books.findIndex(b => b.id === id);
        if (bookIndex === -1) return false;

        const book = books[bookIndex];
        if (!book.available) {
            throw new Error('No se puede eliminar un libro prestado');
        }

        books.splice(bookIndex, 1);
        return true;
    }

    borrowBook(id: number, userId: number): boolean {
        if (!id || !userId) return false;

        const book = books.find(b => b.id === id);
        if (!book) return false;

        if (!book.available) {
            throw new Error('El libro ya está prestado');
        }

        const user = users.find(u => u.id === userId);
        if (!user) return false;

        book.available = false;
        user.borrowedBooks.push(book);
        book.borrowedBy = {
            id: user.id,
            name: user.name
        };

        return true;
    }

    returnBook(id: number): boolean {
        const book = books.find(b => b.id === id);
        if (!book || book.available) return false;

        if (!book.borrowedBy) return false;

        const user = users.find(u => u.id === book?.borrowedBy?.id);
        if (!user) return false;

        const borrowedIndex = user.borrowedBooks.findIndex(b => b.id === id);
        if (borrowedIndex === -1) return false;

        user.borrowedBooks.splice(borrowedIndex, 1);
        book.available = true;
        book.borrowedBy = null;

        return true;
    }
}

export const libraryService = LibraryService.getInstance();

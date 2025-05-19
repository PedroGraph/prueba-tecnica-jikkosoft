import { Users } from "../interfaces/Users";
import { users, books } from "../seeders/books";
import { Book } from "../interfaces/Book";

class UserService {
    private static instance: UserService;
    private constructor() {}

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    createUser(user: Omit<Users, 'id' | 'borrowedBooks'>): Users {
        const foundUser = users.find(userinfo => userinfo.email.toLowerCase() === user.email);

        if (foundUser) {
            throw new Error("Usuario ya existe");
        }

        const newUser: Users = {
            id: users.length + 1,
            ...user,
            borrowedBooks: []
        };
        
        users.push(newUser);
        return newUser;
    }

    getAllUsers(): Users[] {
        return users;
    }

    getUserBooks(userId: number): Book[] {
        const user = users.find(u => u.id === userId);
        return !user || !user.borrowedBooks ? [] : books.filter(book => 
            book.borrowedBy?.id === userId
        );
    }

    getUserById(userId: number): Users | null {
        return users.find(u => u.id === userId) || null;
    }

    updateUser(userId: number, userData: Partial<Users>): Users | null {
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) return null;

        users[userIndex] = {
            ...users[userIndex],
            ...userData
        };

        return users[userIndex];
    }

    deleteUser(userId: number): boolean {
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) return false;

        // Return borrowed books
        const user = users[userIndex];
        if (user.borrowedBooks.length > 0) {
            user.borrowedBooks.forEach(book => {
                const bookIndex = books.findIndex(b => b.id === book.id);
                if (bookIndex !== -1) {
                    books[bookIndex].available = true;
                    books[bookIndex].borrowedBy = null;
                }
            });
        }

        users.splice(userIndex, 1);
        return true;
    }
}

export const userService = UserService.getInstance();
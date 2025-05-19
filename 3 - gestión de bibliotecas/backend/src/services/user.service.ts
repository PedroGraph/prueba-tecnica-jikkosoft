import { Users } from "../interfaces/Users";
import { users, books } from "../seeders/books";
import { Book } from "../interfaces/Book";

export const userService = {
    createUser(user: Omit<Users, 'id' | 'borrowedBooks'>): Users {
        const foundUser = users.find(userinfo => userinfo.email.toLowerCase() === user.email);

        if(foundUser) throw ("Usuario ya existe");

        const newUser: Users = {
            id: users.length + 1,
            ...user,
            borrowedBooks: [] 
        };
        
        users.push(newUser);
        return newUser;
    },

    getAllUsers(): Users[] {
        return users;
    },

    getUserBooks(userId: number): Book[] {
        const user = users.find(u => u.id === userId);
        return !user || !user.borrowedBooks ? [] : books.filter(book => 
            user.borrowedBooks.some(borrowedBook => borrowedBook.id === book.id)
        );
    }
};
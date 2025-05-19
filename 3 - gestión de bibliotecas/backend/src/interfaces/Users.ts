import { Book } from "./Book"
export interface Users {
    id: number,
    name: string,
    email: string,
    borrowedBooks: Book [];
}
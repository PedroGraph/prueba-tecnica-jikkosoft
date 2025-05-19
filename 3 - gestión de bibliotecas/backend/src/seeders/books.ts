import { Users } from "../interfaces/Users";
import { Book } from "../interfaces/Book";

export let books = [
  {
    id: 1,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    available: false,
    borrowedBy: {
        id: 1,
        name: "Ana García",
    },
  },
  {
    id: 2,
    title: "El Quijote",
    author: "Miguel de Cervantes",
    available: true,
    borrowedBy: {},
  },
  {
    id: 3,
    title: "Harry Potter y la piedra filosofal",
    author: "J.K. Rowling",
    available: true,
    borrowedBy: {},
  },
  { id: 4, title: "1984", author: "George Orwell", available: true },
  {
    id: 5,
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    available: true,
    borrowedBy: {},
  },
  { id: 6, title: "El código Da Vinci", author: "Dan Brown", available: true },
  {
    id: 7,
    title: "Los juegos del hambre",
    author: "Suzanne Collins",
    available: true,
  },
  {
    id: 8,
    title: "El Hobbit",
    author: "J.R.R. Tolkien",
    available: true,
    borrowedBy: {},
  },
] as Book[];

export let users = [
  {
    id: 1,
    name: "Ana García",
    email: "ana.garcia@email.com",
    borrowedBooks: [{
      id: 1,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      available: false,
      borrowedBy: {
          id: 1,
          name: "Ana García",
      },
    }]
  },
  {
    id: 2,
    name: "Carlos López",
    email: "carlos.lopez@email.com",
    borrowedBooks: []
  },
  {
    id: 3,
    name: "María Rodríguez",
    email: "maria.rodriguez@email.com",
    borrowedBooks: []
  },
  {
    id: 4,
    name: "Juan Martínez",
    email: "juan.martinez@email.com",
    borrowedBooks: []
  },
  {
    id: 5,
    name: "Laura Sánchez",
    email: "laura.sanchez@email.com",
    borrowedBooks: []
  },
  {
    id: 6,
    name: "Pedro Gómez",
    email: "pedro.gomez@email.com",
    borrowedBooks: []
  },
] as Users[];

export interface Book {
    id: number
    title: string
    author: string
    available: boolean
    borrowedBy?: {
      id: number
      name: string
    }
}

export interface User {
  id: number,
  name: string,
  email: string,
  borrowedBooks: Book [];
} 
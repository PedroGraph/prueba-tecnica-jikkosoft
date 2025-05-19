export interface Book {
    id: number
    title: string
    author: string
    available: boolean
    borrowedBy: {
      id: number
      name: string
    } | null
}
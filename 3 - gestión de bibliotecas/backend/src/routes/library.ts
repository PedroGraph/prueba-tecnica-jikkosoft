import express from 'express';
import { LibraryController } from '../controllers/library.controller';


const router = express.Router();
const controller = new LibraryController();

// Books routes
router.get('/books', controller.getAllBooks.bind(controller));
router.post('/books', controller.addBook.bind(controller));
router.post('/books/:id/borrow', controller.borrowBook.bind(controller));
router.post('/books/:id/return', controller.returnBook.bind(controller));

// Users routes
router.get('/users', controller.getAllUsers.bind(controller));  // GET all users
router.post('/users', controller.createUser.bind(controller));  // Create new user
router.get('/users/:id/books', controller.getUserBooks.bind(controller));  // Get books for specific user

export default router;

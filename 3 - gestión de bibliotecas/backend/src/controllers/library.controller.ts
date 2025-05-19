import { Request, Response } from 'express';
import { libraryService } from '../services/library.service';
import { userService } from '../services/user.service';

export class LibraryController {

    getAllBooks(req: Request, res: Response): void {
        const books = libraryService.getAllBooks();
        res.json(books);
    }

    addBook(req: Request, res: Response): void {
        const book = libraryService.addBook(req.body);
        res.status(201).json(book);
    }

    borrowBook(req: Request, res: Response): void {
        const success = libraryService.borrowBook(Number(req.params.id), Number(req.body.user));
        success ? res.sendStatus(200) : res.sendStatus(400);
    }

    returnBook(req: Request, res: Response): void {
        const success = libraryService.returnBook(Number(req.params.id), Number(req.body.user));
        success ? res.sendStatus(200) : res.sendStatus(400);
    }

    getAllUsers(req: Request, res: Response): void {
        const users = userService.getAllUsers();
        res.json(users);
    }

    createUser(req: Request, res: Response): void {
        const user = userService.createUser(req.body);
        res.status(201).json(user);
    }

    getUserBooks(req: Request, res: Response): void {
        const userId = Number(req.params.id);
        const books = userService.getUserBooks(userId);
        res.json(books);
    }
}
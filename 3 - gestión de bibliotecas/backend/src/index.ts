import express from 'express';
import cors from 'cors';
import libraryRoutes from './routes/library';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', libraryRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

app.listen(PORT, () => {
    console.log(`API available at http://localhost:${PORT}/api`);
});
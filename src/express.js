import express from 'express';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dishesRoutes from './routes/dishesRoutes.js'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Connection test
app.get('/api/status', (req, res) => {
    res.status(200).json({ message: "Connected!" })
})

// All CRUD function for the database
app.use('/api/dishes', dishesRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        code: "404",
        status: "Not Found"
    });
});

app.use((error, req, res, next) => {
    console.error('Unhandled Error:', error);
    res.status(500).json({ message: "Internal Server Error"})
});

export default app;
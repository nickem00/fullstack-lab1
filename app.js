import 'dotenv/config';
import app from './src/express.js'
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL)
    .then(() => {
        console.log('Connected to MongoDB Database')

        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Filed to connect o MongoDB', error)
    });
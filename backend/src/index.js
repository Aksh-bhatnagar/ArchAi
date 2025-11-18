import connectDB from './connections/db/index.js';
import dotenv from 'dotenv';
import { app } from './app.js'

dotenv.config();

connectDB();

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`app is listning at port: ${port}`)
})
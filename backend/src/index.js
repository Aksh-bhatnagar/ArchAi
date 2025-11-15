import connectDB from './db/index.js';
import dotenv from 'dotenv';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 1203

app.listen(port, () => {
    console.log(`app is listning at port: ${port}`)
})
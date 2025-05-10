import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import ConnectDB from './config/ConnectMongoDB.js';
import Routes from './routes/routes.js';
import cors from 'cors'


const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

app.use(cors()); // Allow all origins (for development)
app.use(express.json()); // this is needed to parse JSON bodies
ConnectDB(MONGO_DB_URI);

app.use('/', Routes);



app.get('/', (req, res)=>{
    res.send("Hello")
})

app.listen(PORT , ()=>{
    console.log(`Server is listening on http://localhost:${PORT}`);
    
})
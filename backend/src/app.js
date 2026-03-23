import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()


app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from './routes/user.routes.js';
import floorplanRouter from './routes/floorplan.routes.js';

//routers declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/architech", floorplanRouter)

export { app }
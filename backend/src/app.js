import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.set("trust proxy", 1);

app.use(cors({
  origin: "https://arch-ai-git-main-akshbhatnagar2111-9661s-projects.vercel.app",
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"]
}))
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
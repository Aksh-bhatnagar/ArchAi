import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from './routes/user.routes.js';
import floorplanRouter from './routes/floorplan.routes.js';
// import projectRoutes from './routes/project.routes.js';

//routers declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/architech", floorplanRouter)
// app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/floorplans", floorplanRouter);

export { app }
import express from "express";
import "dotenv/config";
import ErrorMiddleware from "./middleware/ErrorMiddleware.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import db from "./utils/MongoDb.js";
import cors from "cors";
import blogRouter from "./Routes/BlogRouter.js";
import userRouter from "./Routes/userRouter.js";
const app = express();
db();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    optionsSuccessStatus: 200,
  })
);
app.use("*", (req, res, next) => res.send("<h1 >Page Not Found 404</h1>"));
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});

app.use(ErrorMiddleware);

export default app;

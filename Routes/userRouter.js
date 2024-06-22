import express from "express";
import {
  registerUser,
  loginUser,
  profileUser,
} from "../Controller/userController.js";
import auth from "../middleware/Auth.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/profile", auth, profileUser);

export default userRouter;

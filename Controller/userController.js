import userModel from "../Model/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import bcrypt from "bcryptjs";
import jwtToken from "../utils/jwt.js";

export const registerUser = async (req, res, next) => {
  const { name, password, email } = req.body;
  try {
    const isUser = await userModel.findOne({ email });
    if (isUser)
      return next(new ErrorHandler(401, "Email already registered with us."));
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel({ name, password: hashPassword, email });
    await user.save();
    jwtToken(res, user, "successfully register");
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isUser = await userModel.findOne({ email });
    if (!isUser) {
      return next(new ErrorHandler(403, "Invalid Credentials"));
    } else {
      const isPassword = await bcrypt.compare(password, isUser.password);
      if (!isPassword) {
        return next(new ErrorHandler(403, "Invalid Credentials"));
      } else {
        return jwtToken(res, isUser, "successfully login");
      }
    }
  } catch (error) {
    next(error);
  }
};

export const profileUser = async (req, res, next) => {
  const { name, password } = req.body;
  const userId = req.user;
  const updateUserData = await userModel.findByIdAndUpdate(
    { _id: userId },
    { name, password },
    { new: true }
  );
  return jwtToken(res, updateUserData, "successfully updated data");
};
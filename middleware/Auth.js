import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(req.cookies.accessToken);
  console.log(token);
  if (!token)
    return next(new ErrorHandler(403, "Sesison Expire , Please Login Again."));
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  if (!decode) return next(new ErrorHandler(403, "unAuthorized Resource."));
  req.user = decode._id;
  next();
};
export default auth;

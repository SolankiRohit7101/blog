import jwt from "jsonwebtoken";

const jwtToken = (res, user, message) => {
  const { password: pass, ...userData } = user._doc;
  const { email, name, _id, profile_image } = userData;
  const accessToken = jwt.sign(
    { email, name, _id, profile_image },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  const decode = jwt.verify(accessToken, process.env.JWT_SECRET);
  return res
    .cookie("accessToken", accessToken, {
      httpOnly: true, // Cookie is accessible only through HTTP(S) requests, not JavaScript
      secure: true, // Cookie will only be sent over HTTPS
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
      sameSite: "None", // Ensures cross-site requests include cookies (requires Secure flag)
      path: "/", // Cookie is accessible from all paths on the domain
      domain: "blog-cqt0.onrender.com",
    })
    .json({ success: true, message, decode })
    .status(200);
};

export default jwtToken;

import jwt from "jsonwebtoken";

const jwtToken = (res, user, message) => {
  const { password: pass, ...userData } = user._doc;
  const { email, name, _id, profile_image } = userData;
  const accessToken = jwt.sign({ email, name, _id }, process.env.JWT_SECRET, {
    expiresIn: 24 * 60 * 60 * 1000,
  });

  const decode = jwt.verify(accessToken, process.env.JWT_SECRET);

  return res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: Date.now() + 24 * 60 * 60 * 1000,
    })
    .json({ success: true, message, decode })
    .status(200);
};

export default jwtToken;

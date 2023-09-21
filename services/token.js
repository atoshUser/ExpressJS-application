import jwt from "jsonwebtoken";

const generateJwtToken = (userID) => {
  const accessToken = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return accessToken;
};

export default generateJwtToken;

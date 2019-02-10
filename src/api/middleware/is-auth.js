import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const header = req.get("Authorization");

  if (!header) {
    const error = new Error("not authenticated");
    error.statusCode = 401;
    throw error;
  }

  const token = req.get("Authorization").split(" ")[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SROKEN);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if (!decodedToken) {
    const error = new Error("not Authorization");
    error.statusCode = 501;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};

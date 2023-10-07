import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config";
import db from "../utils/db";
const { User } = db;
import asyncHandler from "express-async-handler";
const verifyToken = asyncHandler(async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({
      message: "No token provided",
    });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    req.userId = decoded.id;
    next();
  });
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  if (user) {
    const roles = await user.getRoles();
    roles.length > 0 &&
      roles.forEach((role) => {
        if (role.name === "admin") {
          next();
          return;
        }
      });
    res.status(403).json({
      message: "Require Admin role",
    });
    return;
  }
});

export const authJwt = {
  verifyToken,
  isAdmin,
};

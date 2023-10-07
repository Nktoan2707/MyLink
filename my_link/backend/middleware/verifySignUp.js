import db from "../utils/db";
const { ROLES, User } = db;
const asyncHandler = require("express-async-handler");

const checkDuplicateUsernameOrEmail = asyncHandler(async (req, res, next) => {
  const { username, email, roles } = req.body;
  const isExistingUsername = await User.findOne({
    where: {
      username,
    },
  });

  if (isExistingUsername) {
    res.status(400).json({
      message: "Fail! username is alreay in use.",
    });
    return;
  }

  const isExistingEmail = await User.findOne({
    where: {
      email,
    },
  });
  if (isExistingEmail) {
    res.status(400).json({
      message: "Fail! email is alreay in use.",
    });
  }

  next();
});
const checkRolesExisted = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  const { roles } = req.body;
  const _roles = JSON.parse(roles);
  if (_roles) {
    _roles.forEach((role) => {
      if (!ROLES.includes(role)) {
        res.status(400).json({
          message: "Failed! Role does not exist = " + role,
        });
        return;
      }
    });
  }
  next();
});

export const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

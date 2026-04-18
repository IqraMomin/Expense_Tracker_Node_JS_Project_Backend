const jwt = require("jsonwebtoken");
const { Users } = require("../models");

const authenticate = async (req, res, next) => {
  try {

    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const user = jwt.verify(token, "secretKey");

    const existingUser = await Users.findByPk(user.id);

    if (!existingUser) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (err) {
    console.log(" ERROR >>>", err.message);
    return res.status(401).json({ message: err.message });
  }
};

module.exports = { authenticate };
const jwt = require("jsonwebtoken");

const token = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const { email } = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      req.email = email;
      next();
    } catch (error) {
      res.status(400).json({
        status: 400,
        error: error.message
      });
    }
    return;
  }
  res.status(200).json({
    status: 200,
    message: "You have no token"
  });
};

module.exports = token;
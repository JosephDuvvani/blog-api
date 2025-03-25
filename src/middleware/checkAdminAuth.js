import jwt from "jsonwebtoken";

const checkAdminAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      errors: [{ msg: "Access Denied: User not logged in." }],
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err || user.role != "ADMIN")
      return res.status(403).json({
        errors: [{ msg: "Access Denied: User forbidden." }],
      });

    req.user = user;
    next();
  });
};

export default checkAdminAuth;

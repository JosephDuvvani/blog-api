import { body, validationResult } from "express-validator";
import models from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateAccessToken from "../utils/accessToken.js";

//============= SIGNUP ==============

const validateSignup = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Enter a username")
    .custom(async (value) => {
      const regEx = /[<>:"/\\|?*]/;

      if (regEx.test(value)) {
        throw new Error(
          "A username can't contain any of the following characters: < > : \" / \\ | ? *"
        );
      }

      const exists = await models.User.usernameExists(value);

      if (exists) {
        throw new Error("A user with this username already exists.");
      }
    }),

  body("email")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Enter an email address")
    .isEmail()
    .withMessage("Email address invalid")
    .custom(async (value) => {
      const regEx = /[<>:"/\\|?*]/;

      if (regEx.test(value)) {
        throw new Error(
          "An email address can't contain any of the following characters: < > : \" / \\ | ? *"
        );
      }

      const exists = await models.User.emailExists(value);

      if (exists) {
        throw new Error("A user with this email already exists.");
      }
    }),

  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("A password must contain atleast 6 characters."),
];

const signupPost = [
  validateSignup,
  async (req, res) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
      return res.status(400).json({ errors: results.errors });
    }

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await models.User.create(username, email, hashedPassword);

    const accessToken = generateAccessToken({ username });
    const refreshToken = jwt.sign(
      { username },
      process.env.REFRESH_TOKEN_SECRET
    );
    models.Token.create(refreshToken);

    res.json({ accessToken, refreshToken });
  },
];

//============= LOGIN ==============

const validateLogin = [
  body("email")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Enter an email address")
    .isEmail()
    .withMessage("Email address invalid"),

  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Enter a password")
    .custom((value) => {
      if (value.length > 0 && value.length < 6)
        throw new Error("Invalid Credentials");
      else return true;
    }),
];

const loginPost = [
  validateLogin,
  async (req, res) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
      return res.status(400).json({ errors: results.errors });
    }

    const { email, password } = req.body;

    const user = await models.User.findByEmail(email);

    if (!user) {
      return res.status(400).json({
        errors: [{ msg: "Invalid Credentials" }],
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        errors: [{ msg: "Invalid Credentials" }],
      });
    }

    const accessToken = generateAccessToken({ username: user.username });
    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET
    );
    models.Token.create(refreshToken);

    res.json({ accessToken, refreshToken });
  },
];

const refreshToken = async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken)
    return res.status(401).json({
      errors: [{ msg: "Access Denied: User not logged in." }],
    });

  const exists = models.Token.exists(refreshToken);

  if (!exists)
    return res.status(403).json({
      errors: [{ msg: "Access Denied: Forbidden." }],
    });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({
        errors: [{ msg: "Access Denied: Forbidden." }],
      });

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  });
};

export { signupPost, loginPost, refreshToken };

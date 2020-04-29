const { Router } = require("express");

const router = new Router();
const { check } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),
    check("password", "Password has to be valid.")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "That e-mail already exists. Please try another."
            );
          }
        });
      })
      .normalizeEmail(),
    check(
      "password",
      "Please enter an alphanumeric password at least 5 digits long."
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    check("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Please make sure the passwords match.");
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset-password", authController.getResetPassword);

router.post("/reset-password", authController.postResetPassword);

router.get("/reset-password/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;

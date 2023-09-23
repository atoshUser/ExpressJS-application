import { Router } from "express";
import User from "../../models/user.js";
import bcrypt from "bcrypt";
import generateJwtToken from "../../services/token.js";

const router = Router();
router.get("/login", (req, res) => {
  if (req.cookies.token) {
    res.redirect("/");
    return0;
  }
  res.render("login", {
    title: "Login | Page",
    isLogin: true,
    loginError: req.flash("loginError"),
  });
});

router.get("/register", (req, res) => {
  if (req.cookies.token) {
    res.redirect("/");
    return;
  }
  res.render("register", {
    title: "Register | Page",
    isRegister: true,
    registerError: req.flash("registerError"),
  });
});

router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  if (!Password || !Email) {
    req.flash("loginError", "You must complete complete all requests");
    res.redirect("/login");
    return;
  }

  const existUser = await User.findOne({ email: Email });
  if (existUser) {
    const isPasswordEqual = await bcrypt.compare(Password, existUser.password);
    if (isPasswordEqual) {
      const token = generateJwtToken(existUser._id);
      res.cookie("token", token, { httpOnly: true, secure: true });
    } else {
      req.flash("loginError", "Password is not correct");
      res.redirect("/login");
      return;
    }
  } else {
    req.flash("loginError", "Email is not correct");
    res.redirect("/login");
    return;
  }

  res.redirect("/");
});

router.post("/register", async (req, res) => {
  const { userName, userSurname, Password, Email } = req.body;
  if (!userSurname || !userName || !Password || !Email) {
    req.flash("registerError", "You must complete all fields!");
    res.redirect("/register");
    return;
  }

  const condidate = await User.findOne({ email: req.body.Email });

  if (condidate) {
    req.flash("registerError", "User already exist");
    res.redirect("/register");
    return;
  }
  const hashCode = await bcrypt.hash(Password, 10);
  const userData = {
    firstName: userName,
    lastName: userSurname,
    email: Email,
    password: hashCode,
  };
  const user = await User.create(userData);
  const token = generateJwtToken(user._id);
  res.cookie("token", token, { httpOnly: true, secure: true });

  res.redirect("/");
});

router.get("/logOut", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});
export default router;

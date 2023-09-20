import { Router } from "express";
import User from "../../models/user.js";
import bcrypt from "bcrypt";
const router = Router();
router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login | Page",
    isLogin: true,
    loginError: req.flash("loginError"),
  });
});

router.get("/register", (req, res) => {
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
      console.log(existUser);
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
  const { userName, userSurname, Email, Password } = req.body;
  if (!userSurname || !userName || !Password || !Email) {
    req.flash("registerError", "You must complete all fields!");
    res.redirect("/register");
    return;
  }

  const condidate = User.findOne({ email: Email });
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
  await User.create(userData);
  res.redirect("/");
});

export default router;

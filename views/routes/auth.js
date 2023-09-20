import { Router } from "express";
import User from "../../models/user.js";
import bcrypt from "bcrypt";
const router = Router();
router.get("/login", (req, res) => {
  res.render("login", { title: "Login | Page" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register | Page" });
});

router.post("/login", async (req, res) => {
  const existUser = await User.findOne({ email: req.body.Email });
  if (existUser) {
    const isPasswordEqual = await bcrypt.compare(
      req.body.Password,
      existUser.password
    );
    if (isPasswordEqual) {
      console.log(existUser);
    } else {
      console.log("Password is not correct");
    }
  } else {
    console.log("User not found");
  }

  res.redirect("/");
});

router.post("/register", async (req, res) => {
  const hashCode = await bcrypt.hash(req.body.Password, 10);
  const userData = {
    firstName: req.body.userName,
    lastName: req.body.userSurname,
    email: req.body.Email,
    password: hashCode,
  };
  await User.create(userData);
  res.redirect("/");
});

export default router;

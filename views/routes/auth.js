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

router.post("/login", (req, res) => {
  console.log(req.body);
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

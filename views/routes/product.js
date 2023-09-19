import { Router } from "express";

const router = Router();
router.get("/", (req, res) => {
  res.render("index", { title: "Main | Atosh" });
});

router.get("/products", (req, res) => {
  res.render("products", { title: "Products | Page", isProduct:true });
});

router.get("/add", (req, res) => {
  res.render("add", { title: "Add | Page", isAdd:true });
});

export default router;

import { Router } from "express";
import Product from "../../models/product.js";

const router = Router();
router.get("/", (req, res) => {
  res.render("index", { title: "Main | Atosh" });
});

router.get("/products", (req, res) => {
  res.render("products", { title: "Products | Page", isProduct: true });
});

router.get("/add", (req, res) => {
  res.render("add", { title: "Add | Page", isAdd: true });
});

router.post("/add-product", async (req, res) => {
  await Product.create(req.body);
  res.redirect("/");
});
export default router;

import { Router } from "express";
import Product from "../../models/product.js";
import authMiddleware from "../../middleware/auth.js";
import userMiddleware from "../../middleware/user.js";
const router = Router();
router.get("/", async (req, res) => {
  const dataBase = await Product.find().lean();
  res.render("index", {
    title: "Main | Atosh",
    data: dataBase.reverse(),
    userId: req.userId ? req.userId.toString() : null,
  });
});

router.get("/products", async (req, res) => {
  const user = req.userId ? req.userId.toString() : null;
  const myProducts = await Product.find({ user }).populate("user").lean();
 
  res.render("products", {
    title: "Products | Page",
    isProduct: true,
    myProducts,
  });
});

router.get("/add", authMiddleware, (req, res) => {
  res.render("add", {
    title: "Add | Page",
    isAdd: true,
    errProductAdd: req.flash("errProductAdd"),
  });
});

router.post("/add-product", userMiddleware, async (req, res) => {
  const { title, description, image, price } = req.body;
  if (!title || !description || !image || !price) {
    req.flash("errProductAdd", "You must complete all fields");
    res.redirect("/add");
    return;
  }

  await Product.create({ ...req.body, user: req.userId });

  console.log(req.userId);
  res.redirect("/");
});
export default router;

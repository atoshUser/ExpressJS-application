import { create } from "express-handlebars";
import express from "express";
import AuthRoutes from "./views/routes/auth.js";
import ProductsRoutes from "./views/routes/product.js";
const app = express();

const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(AuthRoutes);
app.use(ProductsRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

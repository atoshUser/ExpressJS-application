import { create } from "express-handlebars";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import session from "express-session";
// Routes
import AuthRoutes from "./views/routes/auth.js";
import ProductsRoutes from "./views/routes/product.js";
import tokenMiddleware from "./middleware/tokenMiddleware.js";
import hbsHelper from "./utils/index.js";
import user from "./middleware/user.js";
dotenv.config();
const app = express();

const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
  helpers: hbsHelper,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(flash());
app.use(cookieParser());
app.use(session({ secret: "atosh", resave: false, saveUninitialized: false }));
// Middleware
app.use(user);
app.use(tokenMiddleware);
// routes
app.use(AuthRoutes);
app.use(ProductsRoutes);

const startProject = () => {
  try {
    const PORT = process.env.PORT || 8000;
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => {
      console.log(`Mongo DB created`);
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {}
};
startProject();

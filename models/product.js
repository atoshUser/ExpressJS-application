import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    user:{type:Schema.Types.ObjectId,ref:'User'}
  },
  {
    timestamps: true, // moongo DB tomonidan productimiz create qilingan vaqti va update qilingan vaqtini qo'yib beradi
  }
);

const Product = model("Product", ProductSchema);
export default Product;

import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();

// File name __filename yaratish
const __filename = fileURLToPath(import.meta.url);
console.log(__filename);

// Folderni ko'rsatish uchun __dirname yaratish
const __dirname = dirname(__filename);
console.log(__dirname);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "about.html"));
});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

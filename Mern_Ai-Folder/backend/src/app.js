const express = require("express");
const cors = require("cors");
const Product = require("./models/Product");
const app = express();
const productRoutes = require("./routes/productRoutes");

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/test-product", async (req, res) => {
  try {
    const product = await Product.create({
      name: "Eco Bottle",
      description: "Reusable stainless steel bottle",
      category: "Home",
      subCategory: "Kitchen",
      tags: ["eco", "bottle", "reusable"],
      sustainability: ["plastic-free", "recycled"]
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Routes 
app.use("/api/products", productRoutes);

module.exports = app;
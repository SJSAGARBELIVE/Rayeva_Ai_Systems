const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const generateProductAI = require("../services/aiService");


// ✅ CREATE PRODUCT WITH AI
router.post("/ai-generate", async (req, res) => {
  try {
    const { name, description } = req.body;

    // 🔍 Validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required"
      });
    }

    // 🤖 AI generation
    const aiData = await generateProductAI(description);

    // 💾 Save to DB
    const product = await Product.create({
      name,
      description,
      category: aiData.category,
      subCategory: aiData.subCategory,
      tags: aiData.tags,
      sustainability: aiData.sustainability
    });

    // 🎯 Response
    res.status(201).json({
      success: true,
      message: "Product created with AI 🚀",
      data: product
    });

  } catch (error) {
    console.error("Route Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});


// ✅ GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


// ✅ GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


module.exports = router;
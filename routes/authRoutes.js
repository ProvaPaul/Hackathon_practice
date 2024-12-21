const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const vision = require("@google-cloud/vision");
const User = require("../models/User");
const router = express.Router();

// Initialize Google Vision client
const client = new vision.ImageAnnotatorClient();

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed!" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid credentials!" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Login failed!" });
  }
});

router.post("/process-image", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Use Google Vision to extract text from the uploaded image
    const [result] = await client.textDetection(req.file.buffer);
    const detections = result.textAnnotations;

    // Extract the text from the response
    const extractedText = detections[0]?.description || "No text found";

    res.json({ text: extractedText });
  } catch (error) {
    console.error("Error processing the image:", error);
    res.status(500).json({ error: "Failed to process the image." });
  }
});

module.exports = router;

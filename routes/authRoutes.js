const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const User = require("../models/User");
const router = express.Router();
const TextModel = require("../models/Text");
const fs = require("fs"); // Required for reading JSON files

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate required fields
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration error:", error.message); // Log detailed error
    res.status(500).json({ error: "Registration failed. Please try again!" });
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

// Process Image route
router.post("/process-image", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Use async/await with Tesseract.js to extract text from the uploaded image
    const {
      data: { text },
    } = await Tesseract.recognize(req.file.buffer, "eng", {
      logger: (m) => console.log(m), // Log progress
    });

    // Save the extracted text to MongoDB
    const newText = new TextModel({ text });
    await newText.save();

    // Send the extracted text as a response
    res.json({ text, id: newText._id });
  } catch (error) {
    console.error("Error processing the image:", error);
    res.status(500).json({ error: "Failed to process the image." });
  }
});

// Load the dummy data from JSON
const data = JSON.parse(fs.readFileSync("./middleware/data.json", "utf8"));

// Chat route
router.post("/chat", (req, res) => {
  const query = req.body.query.toLowerCase();

  // Search for relevant content
  const relevantItem = data.find(
    (item) =>
      item.content.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query)
  );

  if (relevantItem) {
    res.json({
      response: `Based on your query, here's something from "${relevantItem.title}": ${relevantItem.content}`,
    });
  } else {
    res.json({
      response: "I'm sorry, I couldn't find anything relevant in the dataset.",
    });
  }
});

module.exports = router;

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs'); // Required for reading JSON files
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai_hackathon';

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Load the dummy data from JSON
const data = JSON.parse(fs.readFileSync('./middleware/data.json', 'utf8'));

// Chat route
app.post('/api/chat', (req, res) => {
    const query = req.body.query.toLowerCase();

    // Search for relevant content
    const relevantItem = data.find((item) =>
        item.content.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query)
    );

    if (relevantItem) {
        res.json({
            response: `Based on your query, here's something from "${relevantItem.title}": ${relevantItem.content}`
        });
    } else {
        res.json({
            response: "I'm sorry, I couldn't find anything relevant in the dataset."
        });
    }
});

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the AI & API Hackathon Backend");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

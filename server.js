require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const fs = require('fs'); // Required for reading JSON files

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || 'your_default_local_mongo_uri';

mongoose
    .connect(mongoUri)
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
app.get('/', (req, res) => {
    res.send('Welcome to the AI & API Hackathon Backend');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

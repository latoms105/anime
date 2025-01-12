const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const animeRoutes = require('./routes/animeRoute');
require('./database/connection');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Enabling CORS
app.use(bodyParser.json());

// Routes
app.use('/api', animeRoutes);

// Start Server
app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = {
   app,
};

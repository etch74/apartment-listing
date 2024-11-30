const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./sequelize');
const apartmentRoutes = require('./routes/apartments');
const cors = require('cors'); 
// Use CORS middleware

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend's URL
    methods: 'GET,POST,PUT,DELETE',  // You can specify which methods are allowed
    allowedHeaders: 'Content-Type,Authorization' // You can also specify which headers are allowed
  }));
// Database Connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Error: ' + err));

// Sync Database
sequelize.sync().then(() => console.log('Database synced'));

// Routes
app.use('/api/apartments', apartmentRoutes);
app.use(cors());

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

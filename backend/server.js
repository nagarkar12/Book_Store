const express = require('express');
     const mongoose = require('mongoose');
     const cors = require('cors');
     const dotenv = require('dotenv');
     const bookRoutes = require('./routes/books');

     dotenv.config();

     const app = express();
     app.use(cors());
     app.use(express.json());

     mongoose.connect(process.env.MONGO_URI, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     })
       .then(() => console.log('Connected to MongoDB'))
       .catch((err) => console.log('MongoDB connection error:', err));

     app.use('/api/books', bookRoutes);

     app.get('/', (req, res) => {
       res.send('Book Store Backend');
     });

     const PORT = process.env.PORT || 5000;
     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
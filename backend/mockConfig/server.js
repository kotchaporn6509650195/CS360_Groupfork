module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});

// server.js
const express = require('express');
const app = express();
const sequelize = require('./database');
const accountRoutes = require('../routes/account.routes');

// Add middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Account routes
app.use('/api', accountRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Only start the server if we're not in test mode
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync()
    .then(() => {
      console.log('Database connected successfully');
      const PORT = process.env.PORT || 1339;
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch(err => {
      console.error('Database connection error:', err);
    });
}

// ส่งออก app 
module.exports = app;



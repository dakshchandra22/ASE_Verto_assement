const App = require('./app');

// Create and start the application
const app = new App();
app.start();

// Export for testing
module.exports = app.getApp();
// This file serves as an entry point for the application when deployed to Render
// It imports the Express application from express.js

import { app, server } from './express.js';

// This ensures that the server has been started by express.js
// No need to call app.listen again

// Export for testing or programmatic usage
export { app, server };

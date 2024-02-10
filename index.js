const env = require("dotenv");
require("colors");

// Load environment variables from the .env file into the process.env object
env.config();

// Import the server module from the path ./src/server/server
// This module contains the logic to start the application server
require("./src/server/server");

// Import the connection module from the path ./src/database/connection
// This module configures and starts the connection with the database
require("./src/database/connection");
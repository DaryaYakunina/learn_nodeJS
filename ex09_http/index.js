import { createServer } from 'node:http';
import { mainHandler } from './mainHandler.js';

// Create a local server to receive data from
const server = createServer(mainHandler);
server.listen(3000);
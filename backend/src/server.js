require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const socketSetup = require('./sockets');

const PORT = process.env.PORT || 4000;

async function start(){
  await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce');
  const server = http.createServer(app);
  const { Server } = require('socket.io');
  const io = new Server(server, { cors: { origin: process.env.FRONTEND_URL || '*' }});
  socketSetup(io);

  server.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});

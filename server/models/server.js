const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
  constructor() {
    this.port = process.env.PORT;
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = socketio(this.server);
    this.sockets = new Sockets(this.io);
  }

  runMiddlewares() {
    this.app.use(express.static(path.resolve(__dirname, '../public')));
    this.app.use(cors());
  }

  execute() {
    this.runMiddlewares();
    this.sockets.startSocketsEvents();

    this.server.listen(this.port, () => {
      console.log('Server running on port: ' + this.port);
    });
  }
}

module.exports = Server;

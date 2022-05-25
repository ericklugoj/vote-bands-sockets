const BandList = require('./band-list');

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();
  }

  startSocketsEvents() {
    this.io.on('connection', (socket) => {
      console.log('new client connected');

      // Emit all bands
      socket.emit('current-bands', this.bandList.getBands());

      // Emit vote for a band
      socket.on('vote-band', (id) => {
        this.bandList.increaseVotes(id);
        // this.io.emit to emit to all sockets
        this.io.emit('current-bands', this.bandList.getBands());
      });

      // Emit delete a band
      socket.on('delete-band', (id) => {
        this.bandList.removeBand(id);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      // Emit rename a band
      socket.on('rename-band', ({ id, newName }) => {
        this.bandList.changeName(id, newName);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      socket.on('create-band', ({ bandName }) => {
        this.bandList.addBand(bandName);
        this.io.emit('current-bands', this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;

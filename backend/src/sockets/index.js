module.exports = (io) => {
  io.on('connection', socket => {
    console.log('socket connected', socket.id);

    socket.on('joinRoom', roomId => socket.join(roomId));
    socket.on('chatMessage', data => {
      io.to(data.roomId).emit('chatMessage', data);
    });

    socket.on('orderUpdated', data => {
      io.to(`user_${data.userId}`).emit('orderUpdated', data);
    });

    socket.on('disconnect', () => console.log('socket disconnected', socket.id));
  });
};

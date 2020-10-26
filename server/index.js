const server = require('http').createServer();
const io = require('socket.io')(server);
console.log("Started");

io.on('connection', (socket) => {
	socket.on('send msg', (msg) => {
		io.emit('get msg', msg);
	});
});

server.listen(8080, () => {
	console.log('listening on *:8080');
});

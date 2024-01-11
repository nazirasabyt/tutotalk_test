const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

app.use(cors());

const PORT = process.env.PORT || 3005;

app.get('/', (req, res) => {
	res.send('Running');
});

app.get('/get-id', (req, res) => {
	const customId = uuidv4();
	res.status(201).json({ id: customId });
});

// socket.io server as a simple signaling server for webrtc peer connections
/*
io.on('connection', (socket) => {
	socket.on('setMyId', (clientId) => {
		socket.clientId = clientId;

		socket.emit('me', socket.clientId);
	});

	socket.on('disconnect', () => {
		socket.broadcast.emit('callEnded');
	});

	socket.on('callUser', ({ userToCall, signalData, from, name }) => {
		io.to(targetSocket).emit('callUser', { signal: signalData, from, name, userToCall });
	});

	socket.on('answerCall', (data) => {
		io.to(data.to).emit('callAccepted', data.signal);
	});
});
*/

const users = {};

io.on('connection', (socket) => {
	socket.on('setMyId', (customId) => {
		socket.customId = customId;
		users[customId] = socket.id;
		console.log(users);
		socket.emit('me', customId);
		socket.broadcast.emit('userConnected', { customId });
	});

	socket.on('disconnect', () => {
		const disconnectedCustomId = Object.keys(users).find((key) => users[key] === socket.id);

		if (disconnectedCustomId) {
			delete users[disconnectedCustomId];

			socket.broadcast.emit('userDisconnected', { customId: disconnectedCustomId });
		}

		socket.broadcast.emit('callEnded');
	});

	socket.on('callUser', ({ targetCustomId, signalData, from, name }) => {
		console.log(targetCustomId, from);
		const targetSocketId = users[targetCustomId];

		if (targetSocketId) {
			io.to(targetSocketId).emit('callUser', { signal: signalData, from, name, userToCall: socket.customId });
		}
	});

	socket.on('answerCall', (data) => {
		const targetSocketId = users[data.to];

		if (targetSocketId) {
			io.to(targetSocketId).emit('callAccepted', data);
		}
	});
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

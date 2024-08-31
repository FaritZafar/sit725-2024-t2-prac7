// startServerWithMongo.js
const express = require('express');
const http = require('http');
const path = require('path');
const { connectToDatabase } = require('./models/contactModel');
const contactController = require('./controllers/contactController');
const { Server } = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the contact controller for handling routes
app.use('/', contactController);

// Project information to display on connection
const projectInfo = {
    name: 'My Restruant',
    version: '1.0.0',
    description: 'This is a project to demonstrate real-time communication using Sockets.'
};

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Send project information to the connected client
    socket.emit('projectInfo', projectInfo);

    // Example event listener for real-time communication
    socket.on('message', (msg) => {
        console.log('Message received:', msg);
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Connect to the database and start the server
connectToDatabase().then(() => {
    server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}).catch((error) => {
    console.error('Database connection failed:', error);
});

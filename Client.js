const socket = io(); // Initialize Socket.IO client

// Handle project info from server
socket.on('projectInfo', (info) => {
    console.log('Project Info:', info);
    // Update the UI or handle project info here
    document.getElementById('projectInfo').innerText = `Name: ${info.name}, Version: ${info.version}, Description: ${info.description}`;
});

// Handle messages from server
socket.on('message', (msg) => {
    console.log('Message from server:', msg);
    // Display message or update UI here
    document.getElementById('messages').innerText += `${msg}\n`;
});

// Function to send a message to the server
function sendMessage() {
    const message = 'Hello from the client!';
    socket.emit('message', message);
}

// Call this function to send a message when needed
sendMessage();

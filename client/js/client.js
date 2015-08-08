var socket = io.connect(document.URL, {
    "reconnect": false
});

socket.emit("hello");

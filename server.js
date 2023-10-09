const express = require("express");
const app = express()
const port = 2222

//!socket.io
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

//! INI EJS
app.set('view engine', 'ejs');




app.get('/chat', (req,res) => {
    res.render("chat", {title: "masuk forum"})
})

io.on("connection", (socket) => {
    socket.on("message", (data) => {
        const {id, message} = data
        socket.broadcast.emit("message", id, message)
    })
})

server.listen(port, () => {
    console.log(`app listen on port ${port}`);
})
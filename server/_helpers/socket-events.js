module.exports=useSockets

function useSockets(io) {
    io.on('connection', socket => {
        // console.log("User " + socket.id)
        socket.on('message', data => {
            console.log(data)
            socket.emit('message', data)
        })
        socket.on("disconnect", () => {
        //   console.log("User disconnected");
        });
      })
}
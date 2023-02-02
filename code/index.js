
const http = require('http')
const express = require('express')
const path = require('path')
const ser = express();

const serv= http.createServer(ser)
const {Server} = require('socket.io')

const io = new Server(serv);


let usersn = [];

io.on('connection', (socket) => {
console.log('te conectaste wacho')
    socket.on('mensaje  env', (data) =>{
        io.sockets.emit('nuevo men',{
            
            
            mensaje:data,
            user:socket.username
    }


        
        
        
        )
        console.log(data)  
    })
    

    socket.on('nuevo user', (data, cb) =>{
        if (usersn.indexOf(data) != -1){
            cb(false);
        } else {
            cb(true);
            socket.username= data;
            usersn.push(socket.username);
            console.log(usersn)
            io.sockets.emit('nuevo nick', usersn)
        }

        
        console.log(data)  
    })


    socket.on('disconnect', data =>{
        if(!socket.username) {return};

         usersn.splice(usersn.indexOf(socket.username), 1)   
         io.sockets.emit('nuevo nick', usersn)


    })

}
)






ser.use(express.static(path.join(__dirname,"public")));




serv.listen(3000, () => {

    console.log('que miras bobo')


} )


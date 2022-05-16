const app = require('express')();
const http = require('http').Server(app)
const io = require('socket.io')(http,{
    cors:{
        origin:true,
        credentials :true,
        methods:['GET','POST']
    }
})


io.on('connection',(socket)=>{
    console.log('Id usuario: ' + socket.id);

    socket.on('sendMessage',(messageInfo)=>{
        console.log('enviando un mensaje');
        socket.broadcast.emit('receiveMessage',messageInfo)
        
    })
    socket.on('disconnect',(socket)=>{
        console.log('Id usuario desconectado: ' + socket)
    
    })

})


app.get('/',(req,res)=>{
    res.send('Hola mundo')
})

http.listen(3000,()=>{
    console.log('Servidor arriba');
})
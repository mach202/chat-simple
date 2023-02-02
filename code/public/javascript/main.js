

$(function   (){
   
   const socket = io();

   const chat = $('#chat');
   const formulario = $('#formulario');
   const mensa = $('#mensa');

   const inputuser = $('#inputuser');
   const erroruser = $('#erroruser')
   const nick = $('#nick')



   const users = $('#usernames')

        
    inputuser.submit(e =>{
        e.preventDefault();
        console.log(nick.val());
        socket.emit('nuevo user', nick.val(), data => {
            if (data == true){
                $('#usercard').hide();
                $('#miContainer').show();
                
            }else{
                erroruser.html(`<div class="aler alert-danger">Ya existe el usuario pelotudo</div>`)
            }

            nick.val('');
        
        })
    })
    

   formulario.submit(e => {

    e.preventDefault();
    console.log('enviando datos');
    socket.emit('mensaje  env',mensa.val());
    mensa.val('')
   })

   socket.on('nuevo men',(data)=> {
    console.log(data)
    chat.append('<b> '+ data.user + '</b>: ' + data.mensaje+'<br/>')
    })


    socket.on('nuevo nick', data =>{

        console.log(data)

        let temp= ''
        for (let i =0; i < data.length; i++){

            temp += `<p><i class="fas fa-user"></i> ${data[i]}</p>`

        }
        users.html(temp)
    })



})

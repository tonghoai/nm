function typing(){
  socket.on("send-typing-to-client", function(data){
    if(data != ""){
      $('#typing').slideDown();
    } else {
      $('#typing').hide();
    }
  });
}

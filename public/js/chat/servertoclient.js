function servertoclient(){
  socket.on("forward-msg-to-client", function(data){
    var first  = window.innerHeight + window.scrollY;
    var second = document.body.scrollHeight;

    if(data.true == '0'){
      insertName(data.email, data.nickname, 'insertBefore', 'div#content');
    }

    insertChat('left', data.msg, data.sticker, data.pic, 'insertBefore', 'div#content');

    if(first == second){
      window.scrollTo(0,document.body.scrollHeight);
    }
  });
}

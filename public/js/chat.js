var user_id = '<%= user._id %>';
var nickname = '<%= nickname %>';
  $(document).ready(function(){
    var msg = $('#msg');
    var content = $('#content');
    msg.keyup(function(e){
      if(e.which == 13){
        $('<div class="clr"><div class="content-right">'+msg.val()+'</div></div>').insertBefore('div#content');
        var obj = {user_id: user_id, msg: msg.val(), nickname: nickname};
        socket.emit("send-msg-to-server", obj);
        msg.val("");
        window.scrollTo(0,document.body.scrollHeight);
      }

      socket.emit("send-typing-to-server", msg.val());
    });
  });

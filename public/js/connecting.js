var socket = io("http://localhost");

// Server send message data to client
socket.on("forward-msg-to-client", function(data){
  //$('#content').append('<div class="content-left">'+data.msg+'</div>');
  var first  = window.innerHeight + window.scrollY;
  var second = document.body.scrollHeight;

  // Insert data to page
  if(data.true == '0'){
    $('<div class="clr"><div class="content-left-down">'+data.nickname+'</div></div>').insertBefore('div#content');
  }
  $('<div class="clr"><div class="content-left" id="'+data.user_id+'">'+data.msg+'</div></div>').insertBefore('div#content');

  // Goto bottom
  if(first == second){
    window.scrollTo(0,document.body.scrollHeight);
  }
});

// Server first send data to client
socket.on("send-msg-to-client", function(data){
  //console.log(data);
  function renderChat(){
    var id = '<%= user._id %>';
    var flag  = '0';
    var flags = '1';
    //var username = '<%= user.username %>';
    //console.log(username);
    data.forEach(function(chat){
      //console.log(chat);
      // if(flag != chat.user_id){
      //   $('<div class="clr"><div class="content-left-up">'+chat.nickname+'</div></div>').insertAfter('div#content-fix');
      // }

      if(id == chat.user_id){
        var nickname = chat.nickname;
        $('<div class="clr"><div class="content-right">'+chat.msg+'</div></div>').insertBefore('div#content-fix');
        flag = '0';
        flags = '1';
      } else {
        // flag = chat.user_id;
        // flags = chat.user_id;
        flags = chat.user_id;

        if(flag != flags){
          $('<div class="clr"><div class="content-left-down">'+chat.nickname+'</div></div>').insertBefore('div#content-fix');
          flag = chat.user_id;
        }

        $('<div class="clr"><div class="content-left">'+chat.msg+'</div></div>').insertBefore('div#content-fix');
      }
      //flag = chat.user_id;
    });
    //console.log("ok");

    window.scrollTo(0,document.body.scrollHeight);
    $('#img').hide();
  };

  setTimeout(renderChat, 2500);
});

socket.on("send-typing-to-client", function(data){
  if(data != ""){
    $('#typing').slideDown();
  } else {
    $('#typing').hide();
  }
});

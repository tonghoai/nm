function firstsend(user_id){
  socket.on("send-msg-to-client", function(data){
    console.log(data);

    function renderChat(cb){

      setTimeout(() => {
        let res;

        var id = user_id;
        var flag  = '0';
        var flags = '1';
        var posi = 0;
        var PO   = 0;
        var name;
        var mail;
        data.forEach(function(chat){
          if(id == chat.user_id){
            //var nickname = chat.nickname;

            if(posi != 0)
              insertName(mail, name, 'insertAfter', 'div#content-fix');
              //$('<div class="clr"><div style="padding: 33px 0px;"><img src="/img/avatars/'+mail+'.jpg" width="28px" height="28px" style="float: left;" class="img-circle"><div class="content-left-down">'+name+'</div></div></div>').insertAfter('div#content-fix');
            insertChat('right', chat.msg, chat.sticker, chat.pic, 'insertAfter', 'div#content-fix');
            flag = '0';
            flags = '1';
            posi = 0
          } else {
            flag = chat.user_id;
            if(posi == 0)
              flags = chat.user_id;

            if(flags == flag){
              insertChat('left', chat.msg, chat.sticker, chat.pic, 'insertAfter', 'div#content-fix');
              flags = chat.user_id;
            } else {
              insertName(mail, name, 'insertAfter', 'div#content-fix');
              //$('<div class="clr"><div style="padding: 33px 0px;"><img src="/img/avatars/'+mail+'.jpg" width="28px" height="28px" style="float: left;" class="img-circle"><div class="content-left-down">'+name+'</div></div></div>').insertAfter('div#content-fix');
              insertChat('left', chat.msg, chat.sticker, chat.pic, 'insertAfter', 'div#content-fix');
              flags = chat.user_id;
            }

            if(PO == data.length - 1)
            insertName(mail, name, 'insertAfter', 'div#content-fix');
              //$('<div class="clr"><div style="padding: 33px 0px;"><img src="/img/avatars/'+mail+'.jpg" width="28px" height="28px" style="float: left;" class="img-circle"><div class="content-left-down">'+name+'</div></div></div>').insertAfter('div#content-fix');

          posi++;
          }

          name = chat.nickname;
          mail = chat.email;
          PO++;
        });

      $('#img').hide();

      res = "Thanh cong";
      cb(res);
    }, 1000);

    };

    renderChat((res) => {
      if(res){
        $('#wrapper').imagesLoaded( function() {
          $('body').animate({
           scrollTop: document.body.scrollHeight
         }, 500);
        });
      }
    })
  });
}

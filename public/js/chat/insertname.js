function insertName(email, nickname, position, div){
  let RESULT;

  RESULT = '<div class="clr avatar"><img src="/img/avatars/'+email+'.jpg" width="28px" height="28px" style="float: left;" class="img-circle"><div class="content-left-down">'+nickname+'</div></div>';
  if(position == 'insertBefore')
    return $(RESULT).insertBefore(div);
  else {
    return $(RESULT).insertAfter(div);
  }
};

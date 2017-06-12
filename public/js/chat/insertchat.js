function insertChat(align, text, sticker, pic, position, div){
  let TEXT, STICKER, PIC, RESULT;

  TEXT    = (text != 'false')    ? '<div class="msg-'+align+'">'+text+'</div>' : '';
  STICKER = (sticker != 'false') ? '<div class="sticker '+align+'"><img src="/img/sticker/'+sticker+'" class="img-responsive" width="85" height="85"></div>' : '';
  PIC     = (pic != 'false')     ? '<div class="pic '+align+'"><img src="/img/pic/'+pic+'" class="img-thumbnail"></div>' : '';

  RESULT = '<div class="clr '+align+'">'+TEXT+''+STICKER+''+PIC+'</div>';
  if(position == 'insertBefore')
    return $(RESULT).insertBefore(div);
  else {
    return $(RESULT).insertAfter(div);
  }
};

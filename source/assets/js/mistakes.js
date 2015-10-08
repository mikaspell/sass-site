// Скрипт отправки сообщений об ошибке http://mistakes.ru/script/mistakes_dev
// Версия 4.1
// 27.04.2015
var loc = window.location;
var mis;
nN = navigator.appName; 

function createMessage() {
// Измените следующую строку. Здесь нужно указать путь к файлу mistakes.php
  var misphploc = '/assets/js/mistakes.php'
  var container = document.createElement('div')
  var scroll = dde.scrollTop || db.scrollTop;
  var mtop = scroll + 100 + 'px';
  var mleft = Math.floor(dde.clientWidth/2) - 175 + 'px';
  container.innerHTML = '<div id="mistake">\
  <div id="m_window" style="top:' + mtop + '; left:' + mleft + '";>\
        <iframe frameborder="0" name="mis" id="m_frame" src="' + misphploc + '"></iframe></div> \
  </div></div>'

  return container.firstChild
}

function positionMessage(elem) {
  elem.style.position = 'absolute';
  var pageheight = Math.max(dde.scrollHeight, db.scrollHeight, dde.clientHeight);
  var pagewidth = Math.max(dde.scrollWidth, db.scrollWidth, dde.clientWidth);
  elem.style.height = pageheight + 'px';
  elem.style.width = pagewidth + 'px';
}

function winop() {
  dde=document.documentElement;
  db=document.body;
  var messageElem = createMessage()
  positionMessage(messageElem)
  db.appendChild(messageElem)
}

function getText(e) 
{
        if (!e) e= window.event; 
        if((e.ctrlKey) && ((e.keyCode==10)||(e.keyCode==13))) 
        {CtrlEnter();} 
    return true;}
    
function mis_get_sel_text(){
   if (window.getSelection) {
    txt = window.getSelection();
    selected_text = txt.toString();
    full_text = txt.anchorNode.textContent;
    selection_start = txt.anchorOffset;
    selection_end = txt.focusOffset;
  }
  else if (document.getSelection) {
    txt = document.getSelection();
    selected_text = txt.toString();
    full_text = txt.anchorNode.textContent;
    selection_start = txt.anchorOffset;
    selection_end = txt.focusOffset;
  }
  else if (document.selection) {
    txt = document.selection.createRange();
    selected_text = txt.text;
    full_text = txt.parentElement().innerText;

    var stored_range = txt.duplicate();
    stored_range.moveToElementText(txt.parentElement());
    stored_range.setEndPoint('EndToEnd', txt);
    selection_start = stored_range.text.length - txt.text.length;
    selection_end = selection_start + selected_text.length;
  }
  else {
    return;
  }
  var txt = {
    selected_text: selected_text,
    full_text: full_text,
    selection_start: selection_start,
    selection_end: selection_end
  };
  return txt;
}

function mis_get_sel_context(sel) {
  selection_start = sel.selection_start;
  selection_end = sel.selection_end;
  if (selection_start > selection_end) {
    tmp = selection_start;
    selection_start = selection_end;
    selection_end = tmp;
  }
  
  context = sel.full_text;

  context_first = context.substring(0, selection_start);
  context_second = context.substring(selection_start, selection_end);
  context_third = context.substring(selection_end, context.length);
  context = context_first + '<strong>' + context_second + '</strong>' + context_third;
  
  context_start = selection_start - 60;
  if (context_start < 0) {
    context_start = 0;
  }

  context_end = selection_end + 60;
  if (context_end > context.length) {
    context_end = context.length;
  }

  context = context.substring(context_start, context_end);

  context_start = context.indexOf(' ') + 1;

  if (selection_start + 60 < context.length) {
    context_end = context.lastIndexOf(' ', selection_start + 60);
  }
  else {
    context_end = context.length;
  }

  selection_start = context.indexOf('<strong>');
  if (context_start > selection_start) {
    context_start = 0;
  }

  if (context_start) {
    context = context.substring(context_start, context_end);
  }

  return context;
}

function CtrlEnter(){
    var sel = mis_get_sel_text();
    if (sel.selected_text.length > 300) {
		alert('Можно выделить не более 300 символов!');
    }
    else if (sel.selected_text.length == 0) {
		alert('Выделите ошибку!');
    }
    else {
      // Get selection context.
      mis = mis_get_sel_context(sel);
      winop();

    }
  };
  
 function PressLink(){
		mis = 'Пожалуйста, опишите ошибку в комментарии.';
		winop();
  };

document.onkeypress = getText;

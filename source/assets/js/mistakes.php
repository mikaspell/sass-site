<!-- Скрипт отправки сообщений об ошибке http://mistakes.ru/script/mistakes_dev -->
<!-- Версия 4.1 от 27.04.2015-->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<TITLE>Отправить ошибку</TITLE>
<style type="text/css">
body {
margin: 23px 28px 0 28px;
font-size:14px;
font-family:Helvetica, Sans-serif, Arial;
line-height:2em;
}
form {margin: 0;}
.text {
font-weight: bold;
font-size:12px;
color:#777;
}
.copyright {
font-size:11px;
color:#777;
}
.mclose a{
font:bold 16px Verdana;
color:#7f7f7f;
position:absolute;
right:12px;
top:9px;
display:block;
text-decoration:none;
}
.mclose a:hover{
color: #000;
}
#m{
border: 1px solid silver;
padding: 3px;
width: 294px;
border-radius:4px;
font-size: 13px;
background-color: #fff;
}
#m strong{
color:red;
}
</style>

<script language="JavaScript"> 
var p=top;
function readtxt()
{ if(p!=null)document.forms.mistake.url.value=p.loc
 if(p!=null)document.forms.mistake.mis.value=p.mis
}
function hide()
{ var win=p.document.getElementById('mistake');
win.parentNode.removeChild(win);
}
</script>

<?php 
if($_POST['submit']) { 
    # Заголовок сообщения - замените "yousite.ru" на имя своего сайта:
$title = 'Сообщение об ошибке на сайте "Документация по Sass"';
$ip = getenv('REMOTE_ADDR');
$url = (trim($_POST['url']));
$mis =  (trim($_POST['mis']));
$comment =  substr(htmlspecialchars(trim($_POST['comment'])), 0, 100000);
                       
                $mess = '
                <html>
                <head>
                <title>Ошибка на сайте</title>
                </head>
                <body>
                <strong>Адрес страницы:</strong> <a href="'.$url.'">'.$url.'</a>
                <br/>
                <strong>Ошибка:</strong> '.$mis.'
                <br/>
                <strong>Комментарий:</strong> '.$comment.'
                <br/>                               
                <strong>IP:</strong> '.$ip.'
                '.$_POST['mess'].'
                </body>
                </html>
                ';
# Email адрес, на который должны приходить сообщения:               
$to = 'work@melkee.ru';
# Email адрес, от кого пришло сообщение:
$mymail='mistake@sass-scss.ru';
# Вместо "yousite.ru" указжите имя вашего сайта: 
        $from = "From: =?utf-8?B?". base64_encode("sass-scss.ru"). "?= < $mymail >\n";
        $from .= "X-Sender: < $mymail >\n";
        $from .= "Content-Type: text/html; charset=utf-8\n";
               
mail($to, $title, $mess, $from);
echo '<div class="mclose"><a href="javascript:void(0)" onclick="hide()" title="Закрыть">&times;</a></div><br><br><br><center>Спасибо!<br>Ваше сообщение отправлено.<br><br><br><input onclick="hide()" type="button" value="Закрыть окно" id="close" name="close"><br><br><br><a class="copyright" href="" target="_blank" title="">&nbsp;</a><center>'; 
exit();
}  
?>

</head>
<body onload=readtxt()>
<div class="mclose"><a href="javascript:void(0)" onclick="hide()" title="Закрыть">&times;</a></div>
<span class="text">
Адрес страницы:
 </span>
<br /> 
<form name="mistake" action="" method=post>
<input id="m" type="text" name="url" size="35" readonly="readonly">
              <span class="text">
              Ошибка:
              </span><br />
              <div id="m" style="line-height:normal;height: 75px;width: 287px;">
<script language="JavaScript">
	document.write(p.mis); 
</script>
              </div>
              <input type="hidden" id="m" rows="5" name="mis" readonly="readonly"></textarea>
              <span class="text">
              Комментарий:
              </span>
              <br /> 
              <textarea id="m" rows="5" name="comment" cols="30"></textarea> 
              <div style="margin-top: 7px"><input type="submit" value="Отправить" name="submit">
              <input onclick="hide()" type="button" value="Отмена" id="close" name="close"> 
              </div>
</form> 

</body></html>

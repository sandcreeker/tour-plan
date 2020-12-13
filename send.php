<?php

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$name = $_POST['name'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$subscribe = $_POST ['subscribe'];
$bookingName = $_POST ['booking-name'];
$bookingPhone = $_POST ['booking-phone'];
$bookingEmail = $_POST ['booking-email'];


$title = "Отзыв Best Tour Plan";
$body = "
<h2>Пользователь оставил отзыв</h2>
<b>Имя:</b> $name<br>
<b>Телефон:</b> $phone<br><br>
<b>Сообщение:</b><br>$message
";
    if ($subscribe) {
        $title = "Подписка оформлена";
        $body = "
        <h2>Спасибо, что подписались</h2>";
    }

    if ($bookingName & $bookingPhone & $bookingEmail) {
        $title = "Пользователь забронировал отель";
        $body = "
        <h2>Параметры обращения</h2>
        <b>Имя:</b> $bookingName<br>
        <b>Телефон:</b> $bookingPhone<br><br>
        <b>Email:</b> $bookingEmail<br><br>
        <b>Сообщение:</b><br>$message";
        
    }

$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    // $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    $mail->Host       = 'smtp.gmail.com'; 
    $mail->Username   = 'daniltrifonov367@gmail.com';
    $mail->Password   = 'Lyb-5EH-rLN-ZsA'; 
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('daniltrifonov367@gmail.com', 'Данил Трифонов'); 


    $mail->addAddress('cheef.trifonov@yandex.ru');


    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;    


if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

header('location: feedback.html');
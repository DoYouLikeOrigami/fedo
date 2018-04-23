<?php
	$to = "fedo.npfkarat@gmail.com";
	$from = "no-reply@fe-do.ru";
	$subject = "Заказ с сайта";

	$message = "";
	$message .= "<p></br>Количество упаковок: " . $_POST["amount"] . "</p>";
	$message .= "<p></br>Регион: " . $_POST["geo"] . "</p>";
	$message .= "<p></br>Способ доставки: " . $_POST["delivery"] . "</p>";

	if (isset($_POST["address"])) {
		$message .= "<p></br>Точный адрес: " . $_POST["address"] . "</p>";
	}
	if (isset($_POST["address-index"])) {
		$message .= "<p></br>Индекс: " . $_POST["address-index"] . "</p>";
	}
	if (isset($_POST["address-name"])) {
		$message .= "<p></br>Имя, на которое нужно оформить посылку: " . $_POST["address-name"] . "</p>";
	}
	if (isset($_POST["selftake"])) {
		$message .= "<p></br>Адрес самовывоза: " . $_POST["selftake"] . "</p>";
	}

	$message .= "<p></br>Способ оплаты: " . $_POST["pay"] . "</p>";
	$message .= "<p></br>Телефон: " . $_POST["tel"] . "</p>";
	$message .= "<p></br>Email: " . $_POST["email"] . "</p>";

	$headers  = "Content-type: text/html; charset=utf-8 \r\n";
	$headers .= "From: От <no-reply@fe-do.ru>\r\n";

	mail($to, $subject, $message, $headers);

	require_once("thankyou.html");
?>

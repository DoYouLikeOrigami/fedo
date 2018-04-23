<?php
	$to = "fedo.npfkarat@gmail.com";
	$from = "no-reply@fe-do.ru";
	$subject = "Успешная покупка на сайте";

	if (isset($_POST["shp_info"])) {
		$message = $_POST["shp_info"];
	}
	else {
		$message = "Информация о покупателе не была передана";
	}

	$headers  = "Content-type: text/html; charset=utf-8 \r\n";
	$headers .= "From: От <no-reply@fe-do.ru>\r\n";

	mail($to, $subject, $message, $headers);

	require_once("success.html");
?>

<?php
	$to = "fedo.npfkarat@gmail.com";
	$from = "no-reply@fe-do.ru";

	if (isset($_POST["info"])) {
		$subject = $_POST["info"];

	$message = "";
	if (isset($_POST["tel"])) {
	  $message .= "<p></br>Телефон: " . $_POST["tel"] . "</p>";
	}
	if (isset($_POST["email"])) {
	  $message .= "<p></br>Email: " . $_POST["email"] . "</p>";
	}

	$headers  = "Content-type: text/html; charset=utf-8 \r\n";
	$headers .= "From: От <no-reply@fe-do.ru>\r\n";

	mail($to, $subject, $message, $headers);
	}

	require_once("thankyou.html");
?>

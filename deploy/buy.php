<?
// регистрационная информация (логин, пароль #1)
// registration info (login, password #1)
$mrh_login = "fedo";
$mrh_pass1 = "IL8lbmU30S9x5yPufZva";

// номер заказа
// number of order
$inv_id = 0;

// описание заказа
// order description
$inv_desc = "Покупка FeDo";

$shp_address = "Точный адрес: ";
$shp_address .= $_POST["address"] or "не указан";

$shp_addressi = "Почтовый индекс: ";
$shp_addressi .= $_POST["address-index"] or "не указан";

$shp_addressn = "Имя получателя посылки: ";
$shp_addressn .= $_POST["address-name"] or "не указано";

$shp_delivery = "Способ доставки: ";
$shp_delivery .= $_POST["delivery"];

$shp_email = "Email: ";
$shp_email .= $_POST["email"];

$shp_geo = "Регион: ";
$shp_geo .= $_POST["geo"];

$shp_selftake = "Точка самовывоза: ";
$shp_selftake .= $_POST["selftake"] or "не указана";

$shp_tel = "Телефон: ";
$shp_tel .= $_POST["tel"];

$shp_name = "ФИО: ";
$shp_name .= $_POST["name"];

$shp_info = $shp_address . " " . $shp_addressi . " " . $shp_addressn . " " . $shp_delivery . " " . $shp_email . " " . $shp_geo . " " . $shp_selftake . " " . $shp_tel . " " . $shp_name;

$sum = $_POST["amount"] * 1800;

if ($_POST["delivery"] === "Курьер") {
	$sum += 250;
}
else if ($_POST["delivery"] === "Почта") {
	$sum += 300;
}
else if ($_POST["delivery"] != "Самовывоз") {
	return require_once("buy.html");
}

$sum = (string) $sum + ".00";

// сумма заказа
$out_summ = $sum;

// тип товара
// code of goods
$shp_item = 1;

// язык
// language
$culture = "ru";

// кодировка
// encoding
$encoding = "utf-8";

// формирование подписи
// generate signature
$crc  = md5("$mrh_login:$out_summ:$inv_id:$mrh_pass1:shp_info=$shp_info:shp_Item=$shp_item");

// HTML-страница с кассой
// ROBOKASSA HTML-page
print "<html><script language=JavaScript ".
      "src='https://auth.robokassa.ru/Merchant/PaymentForm/FormMS.js?".
      "MerchantLogin=$mrh_login&OutSum=$out_summ&InvId=$inv_id".
      "&Description=$inv_desc&SignatureValue=$crc&shp_info=$shp_info&shp_Item=$shp_item".
      "&Culture=$culture&Encoding=$encoding'></script></html>";
?>

var formModule = (function () {

	var init = function () {
		if (document.querySelector('.js--order-form')) {

			_initVars();
			_setUpListeners();
		};
	};

	var _vars = {
		form : false,
		geoBlock : false,
		deliveryBlock : false,
		addressBlocksArray: false,
		payBlock: false
	};

	var _initVars = function () {
		_vars.form = document.querySelector('.js--order-form');
		_vars.geoBlock = _vars.form.querySelector('.js--geo-block');
		_vars.deliveryBlock = _vars.form.querySelector('.js--delivery-block');
		_vars.addressBlocksArray = _vars.form.querySelectorAll('.js--address-block');
		_vars.payBlock = _vars.form.querySelector('.js--pay-block');
		_vars.submitBtn = _vars.form.querySelector('.js--submit-btn');
	};

	var _setUpListeners = function () {
		_geoListener();
		_addressListener();
		_payListener();
		_deliverListener();
		_onlinePayListener();
	};

	var _geoListener = function () {
		var geoRadioArray = _vars.geoBlock.querySelectorAll('.js--geo');

		Array.prototype.forEach.call(geoRadioArray, function(geoRadioButton) {
			geoRadioButton.addEventListener('change', function(ev) {
				_disableCourierPayment();
				_hideAddressBlocks();

				var radioBtns = _vars.deliveryBlock.querySelectorAll('.js--delivery'),
						radioLabels = _vars.deliveryBlock.querySelectorAll('.js--delivery + label'),
						geoData = geoRadioButton.dataset.geo,
						cleanRadioLabels = _vars.deliveryBlock.querySelectorAll('.js--delivery-' + geoData + ' + label');

				for (var i = 0; i < radioBtns.length; i++) {
					radioBtns[i].checked = false;

					if (radioBtns[i].classList.contains('js--delivery-' + geoData)) {
						radioBtns[i].removeAttribute('disabled');
					}
					else {
						radioBtns[i].setAttribute('disabled', 'disabled');
					};

					radioLabels[i].classList.add('order-form__label--disabled');
				};

				for (var i = 0; i < cleanRadioLabels.length; i++) {
					cleanRadioLabels[i].classList.remove('order-form__label--disabled');
				};
			});
		});
	};

	var _addressListener = function () {
		var deliverRadioArray = _vars.deliveryBlock.querySelectorAll('.js--delivery');

		Array.prototype.forEach.call(deliverRadioArray, function(deliverRadioButton) {
			deliverRadioButton.addEventListener('change', function(ev) {

				_hideAddressBlocks();

				var addressData = deliverRadioButton.dataset.address,
						blockToShow = _vars.form.querySelector('.js--address-block-' + addressData),
						blockInputs = blockToShow.querySelectorAll('input'),
						blockSelects = blockToShow.querySelectorAll('select');

				blockToShow.classList.remove('order-form__step--hidden');

				for (var j = 0; j < blockInputs.length; j++) {
					blockInputs[j].removeAttribute('disabled');
				};

				for (var j = 0; j < blockSelects.length; j++) {
					blockSelects[j].removeAttribute('disabled');
				};
			});
		});
	};

	var _deliverListener = function () {
		var deliverRadioArray = _vars.deliveryBlock.querySelectorAll('.js--delivery');

		Array.prototype.forEach.call(deliverRadioArray, function(deliverRadioButton) {
			deliverRadioButton.addEventListener('change', function(ev) {
				_disableCourierPayment();

				var payData = deliverRadioButton.dataset.address,
						radioButton = _vars.payBlock.querySelector('.js--pay-courier'),
						label = _vars.payBlock.querySelector('.js--pay-courier + label');

				if (payData === 'courier') {
					radioButton.removeAttribute('disabled');
					label.classList.remove('order-form__label--disabled');
				};
			});
		});
	};

	var _onlinePayListener = function () {
		var onlinePayRadio = _vars.payBlock.querySelector('.js--pay-online');

		onlinePayRadio.addEventListener('change', function(ev) {

			_resetSubmitBtn();

			if (onlinePayRadio.checked === true) {
				_vars.submitBtn.innerText = 'Перейти к оплате';
				_vars.form.action = './buy.php';
			};
		});
	};

	var _payListener = function () {
		var payRadioArray = _vars.payBlock.querySelectorAll('.js--pay');

		Array.prototype.forEach.call(payRadioArray, function(payRadioButton) {
			payRadioButton.addEventListener('change', function(ev) {
				_resetSubmitBtn();
			});
		});
	};

	var _disableCourierPayment = function () {

		var radioButton = _vars.payBlock.querySelector('.js--pay-courier'),
				label = _vars.payBlock.querySelector('.js--pay-courier + label');

		radioButton.checked = false;
		radioButton.setAttribute('disabled', 'disabled');
		label.classList.add('order-form__label--disabled');
	};

	var _hideAddressBlocks = function () {
		for (var i = 0; i < _vars.addressBlocksArray.length; i++) {
			_vars.addressBlocksArray[i].classList.add('order-form__step--hidden');

			var blockInputs = _vars.addressBlocksArray[i].querySelectorAll('input'),
					blockSelects = _vars.addressBlocksArray[i].querySelectorAll('select');

			for (var j = 0; j < blockInputs.length; j++) {
				blockInputs[j].setAttribute('disabled', 'disabled');
			};

			for (var j = 0; j < blockSelects.length; j++) {
				blockSelects[j].setAttribute('disabled', 'disabled');
			};
		};
	};

	var _resetSubmitBtn = function () {
		_vars.submitBtn.innerText = 'Оформить заказ';
		_vars.form.action = './order.php';
	};

	return {
		init: init
	};

})();

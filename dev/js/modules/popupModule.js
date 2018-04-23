var popupModule = (function () {
	var init = function (popupsNamesArray) {

		if (popupsNamesArray) {
			_initVars(popupsNamesArray);
		}

		_setUpListeners();
		_defaultRun();
	};

	var hide = function (popupClassName) {
		if (!popupClassName) {
			_hidePopup();
		}

		else {
			var popup = document.querySelector('.' + popupClassName);

			if (!popup) {
				console.error('popupModule -> hide : no popup found by class name ' + popupClassName);
				_hidePopup();
				return false;
			};

			_hidePopup(popup);
		}
	};

	var _vars = {
		popups : false,
		popupClass : 'popup',
		popupNameTemplateClass : 'popup--js-',
		popupTextClass : 'popup__text',
		popupActiveClass : 'popup--active',

		overlay : document.querySelector('.overlay') || false,
		overlayActiveClass : 'overlay--active',

		closeBtnClass : 'js--close-popup',
		openPopupTemplateClass : 'js--show-' + ':' + '-popup'
	};

	var _initVars = function (popupsNamesArray) {
		_vars.popups = popupsNamesArray;
	};

	var _setUpListeners = function () {
	};

	var _defaultRun = function () {
		_popupsBindClose();
		_popupsBindOpen();
	};

	// Opens past popup and returns true
	// if no popup passed - returns false
	var _showPopup = function (popup) {
		// Если открыт другой попап, то сначала его прячем,
		// а потом показываем этот, чтобы не было багов
		if (_hidePopup()) {
			if (!popup) {
				return false;
			};

			popup.classList.add(_vars.popupActiveClass);
			if (_vars.overlay) _vars.overlay.classList.add(_vars.overlayActiveClass);

			return true;
		};
	};

	// Closes past popup
	// if no popup passed - finds active one and closes it
	// returns true
	var _hidePopup = function (popup) {
		if (!popup) {
			popup = document.querySelector('.' + _vars.popupActiveClass);
		}

		if (popup) popup.classList.remove(_vars.popupActiveClass);
		if (_vars.overlay) _vars.overlay.classList.remove(_vars.overlayActiveClass);

		return true;
	};

	var _popupsBindClose = function () {
		var popups = document.querySelectorAll('.' + _vars.popupClass);

		// Событие скрытия попапов при нажатии на кнопку .js--close-popup
		if (popups) {
			Array.prototype.forEach.call(popups, function(popup, index) {
				var hideBtns = popup.querySelectorAll('.' + _vars.closeBtnClass);

				if (hideBtns) {
					Array.prototype.forEach.call(hideBtns, function(hideBtn, index) {
						hideBtn.addEventListener('click', function(e) {
							e.preventDefault();
							_hidePopup(popup);
						});
					});
				};

			});
		};

		// Событие скрытия попапов при нажатии на overlay
		if (_vars.overlay) {
			_vars.overlay.addEventListener('click', function(e) {
				e.preventDefault();
				_hidePopup();
			});
		};
	};

	// Создаёт событие открытия попапа при нажатии на кнопку по имени попапа
	var _bindPopup = function (popupName) {
		var btnsQuerySelector = '.' + _vars.openPopupTemplateClass.split(':')[0] + popupName + _vars.openPopupTemplateClass.split(':')[1],
				btns = document.querySelectorAll(btnsQuerySelector),
				popup = document.querySelector('.' + _vars.popupNameTemplateClass + popupName);

		if (btns && popup) {
			Array.prototype.forEach.call(btns, function(btn, index) {
				btn.addEventListener('click', function(e) {
					e.preventDefault();

					var info = _getBtnInfo(btn);
					if (info) _insertInfoInPopup(popup, info);

					_showPopup(popup);
				});
			});
		}
		else {
			console.info('popupModule -> _bindPopup : no popup or btns found by name ' + popupName);
			return false;
		};
	};

	var _popupsBindOpen = function () {
		for (var number in _vars.popups) {
			_bindPopup(_vars.popups[number]);
		};
	};

	var _getBtnInfo = function (btn) {
		if (!btn) return false;

		var info = {
			hiddenInfo : btn.dataset.info ? btn.dataset.info : false,
			popupText : btn.dataset.text ? btn.dataset.text : false,
			btnText : btn.dataset.btn ? btn.dataset.btn : false
		};

		return info;
	};

	var _insertInfoInPopup = function (popup, info) {
		if (!popup || !info) return false;

		var popupText = popup.querySelector('.' + _vars.popupTextClass),
				popupInfo = popup.querySelector('input[name="info"]'),
				popupBtn  = popup.querySelector('button[type="submit"]');

		if (popupText && info.popupText) {
			popupText.innerText = info.popupText;
		};

		if (popupBtn && info.btnText) {
			popupBtn.innerText = info.btnText;
		};

		if (popupInfo && info.hiddenInfo) {
			popupInfo.value = info.hiddenInfo;
		};

		return true;
	};

	/*var show = function (class) {
		var popup = document.querySelector(class);

		return _showPopup(popup);
	};*/

	var show = function () {
		console.log('show');
	};

	return {
		init: init,
		showPopup: show,
		hide : hide
	};

})();

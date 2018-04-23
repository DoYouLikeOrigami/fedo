var jumpModule = (function () {
	var init = function () {
		_setUpListeners();
		_defaultRun();
	};

	var _vars = {
		key : 'value'
	};

	var _setUpListeners = function () {
	};

	var _defaultRun = function () {
		_bindPageNav('js--jump', '');
	};

	var _bindPageNav = function (itemClassName, headerClassName) {

		var navItems = document.querySelectorAll('.' + itemClassName);

		Array.prototype.forEach.call(navItems, function(navItem, index) {
			navItem.addEventListener('click', function(e) {
				e.preventDefault();

				popupModule.hide();

				var jumpToSelector = '#' + navItem.href.split('#')[1],
						jumpToItem = document.querySelector(jumpToSelector);

				Jump(jumpToItem, {
					duration: 1500,
					offset: 0
				});
			});
		});
	};

	return {
		init: init
	};

})();

var mainModule = (function () {

	var init = function () {
		document.addEventListener("DOMContentLoaded", function () {
			_setUpListeners();
			_defaultRun();
		});
	};

	var _setUpListeners = function () {
	};

	var _defaultRun = function () {
		popupModule.init(_vars.popupsNamesArray);
		jumpModule.init();
		formModule.init();
	};

	var _vars = {
		popupsNamesArray : ['img', 'video', 'call', 'mobile-nav', 'consult', 'test-1', 'test-2', 'test-3', 'test-4', 'test-5', 'test-6']
	};

	return {
		init: init
	};

})();

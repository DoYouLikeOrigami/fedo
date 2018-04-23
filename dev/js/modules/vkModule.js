var widget = VK.Widgets.CommunityMessages("vk_community_messages", 150207097, {
						expandTimeout: "30000",
						widgetPosition: "left",
						disableNewMessagesSound: "1",
						tooltipButtonText: "Нажмите, чтобы получить консультацию!"
					});

var showWidgetButton = document.querySelector('.js--show-widget');

if (showWidgetButton) {
	showWidgetButton.addEventListener('click', function (ev) {
		ev.preventDefault();

		popupModule.hide();

		widget.expand({
			welcomeScreen: 1,
		});
	});
};

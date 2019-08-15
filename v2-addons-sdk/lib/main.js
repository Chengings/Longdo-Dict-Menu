var contextMenu = require("sdk/context-menu");
var selection = require("sdk/selection");
var data = require("sdk/self").data;
var _ = require("sdk/l10n").get;
var menu_item = contextMenu.Item({
	label: _("find_context"),
	image: data.url("longdo.ico"),
      context: contextMenu.SelectionContext(),
      contentScript: 'self.on("click", function () {' +
      'var gettext = window.getSelection().toString();' +
      'self.postMessage(gettext);' +
      '});',
    onMessage: function (text) {
		var text = text.trim();
		if (text.length === 0 || text == ' '){
			throw ("Text to translate must not be empty");
		}
		var panel = require("sdk/panel").Panel({
			contentURL: "https://dict.longdo.com/mobile.php?search=" + text,
			contentScriptFile: [data.url("windowpanel.js")],
			width: 500,
			height: 500
        });
		panel.show();
	}
});

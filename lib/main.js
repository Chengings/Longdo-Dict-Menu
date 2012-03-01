var contextMenu = require("context-menu");
var selection = require("selection");
var data = require("self").data;
exports.main = function() {
    var menu_item = contextMenu.Item({
        label: "ค้นคำด้วย Longdo Dict",
        context: contextMenu.SelectionContext(),
        contentScript: 'self.on("click", function () {' +
        ' var gettext = window.getSelection().toString();' +
        ' self.postMessage(gettext);' +
        '});',
        onMessage: function (text) {
             if (text.length === 0 || text == ' '){
                 throw ("Text to translate must not be empty");
             }
             // TODO:do something like google context menu
             var panel = require("panel").Panel({
               contentURL: "http://dict.longdo.com/mobile.php?search=" + text,
               contentScriptFile: [data.url("windowpanel.js")],
               width: 500,
               height: 500
             });    
             panel.show();
         }
    });
};
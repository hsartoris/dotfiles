//ensure firefox and webkit interoperatability
var WebExtension = chrome || browser;
function openOrFocusOptionsPage() {
    'use strict';
    var optionsUrl = WebExtension.extension.getURL('data/options/index.html');
    WebExtension.tabs.query({}, function (extensionTabs) {
        var found = false, i;
        for (i = 0; i < extensionTabs.length; i++) {
            if (optionsUrl === extensionTabs[i].url) {
                found = true;
                WebExtension.tabs.update(extensionTabs[i].id, {"selected": true});
                WebExtension.tabs.reload(extensionTabs[i].id);
            }
        }
        if (found === false) {
            WebExtension.tabs.create({url: "data/options/index.html"});
        }
    });
}
WebExtension.extension.onConnect.addListener(function (port) {
    'use strict';
    var tab = port.sender.tab;
    // This will get called by the content script we execute in
    // the tab as a result of the user pressing the browser action.
    port.onMessage.addListener(function (info) {
        var max_length = 1024;
        if (info.selection.length > max_length) {
            info.selection = info.selection.substring(0, max_length);
        }
        openOrFocusOptionsPage();
    });
});

// Called when the user clicks on the browser action icon.
WebExtension.browserAction.onClicked.addListener(function (tab) {
    'use strict';
    openOrFocusOptionsPage();
});

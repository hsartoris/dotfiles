chrome.contextMenus.create({
		"id": "rtiy-context",
    "title": "Highlight text containing Russian words to see their translation.",
    "contexts": ["selection", "page"],
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
		if (request.request === "updateContext") {
			chrome.contextMenus.update("rtiy-context", {title: request.newText});
		}
  });

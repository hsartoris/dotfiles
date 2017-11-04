/*
Ratings Preview for YouTube
Copyright (C) 2011-2017 Cristian Perez <http://www.cpr.name>
All rights reserved.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CRISTIAN PEREZ BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// INITIALIZATION ////////////////////////////////////////////////////////////////////////////////

// Manual settings
var SHOW_UPDATE_NOTICE = false;

// Settings keys
var YTRP_VERSION_KEY = "YTRP_VERSION";
var YTRP_COUNT_KEY = "YTRP_COUNT";
var YTRP_BAR_STYLE_KEY = "YTRP_BAR_STYLE";
var YTRP_BAR_THICKNESS_KEY = "YTRP_BAR_THICKNESS";
var YTRP_HIGHLIGHTED_VIDEOS_KEY = "YTRP_HIGHLIGHTED_VIDEOS";
var YTRP_SHOW_RP_SCORE_KEY = "YTRP_SHOW_RP_SCORE";
var YTRP_BAR_OPACITY_KEY = "YTRP_BAR_OPACITY";
var YTRP_CACHING_KEY = "YTRP_CACHING";
var YTRP_PLAYBACK_PROGRESS_BAR_KEY = "YTRP_PLAYBACK_PROGRESS_BAR";

//DEBUG: Clear settings
//localStorage.removeItem(YTRP_VERSION_KEY);
//localStorage.removeItem(YTRP_COUNT_KEY);
//localStorage.removeItem(YTRP_BAR_STYLE_KEY);
//localStorage.removeItem(YTRP_BAR_THICKNESS_KEY);
//localStorage.removeItem(YTRP_HIGHLIGHTED_VIDEOS_KEY);
//localStorage.removeItem(YTRP_SHOW_RP_SCORE_KEY);
//localStorage.removeItem(YTRP_BAR_OPACITY_KEY);
//localStorage.removeItem(YTRP_CACHING_KEY);
//localStorage.removeItem(YTRP_PLAYBACK_PROGRESS_BAR_KEY);

// Default settings
var YTRP_DEFAULT_BAR_STYLE = 1 // Default is 1 (modern) [classic, modern]
var YTRP_DEFAULT_BAR_THICKNESS = 4; // Default is 4
var YTRP_DEFAULT_HIGHLIGHTED_VIDEOS = 0; // Default is 0
var YTRP_DEFAULT_SHOW_RP_SCORE = false; // Default is false
var YTRP_DEFAULT_BAR_OPACITY = 8; // Default is 8 (opaque) [invisible, 20%, 40%, 50%, 60%, 70%, 80%, 90%, opaque]
var YTRP_DEFAULT_CACHING = 3; // Default is 3 (1h) [disabled, 5m, 30m, 1h, 2h, 6h, 12h, 24h]
var YTRP_DEFAULT_PLAYBACK_PROGRESS_BAR = 0; // Default is 0 (top) [top, bottom/hidden]

// YouTube API configuration
var YOUTUBE_API_MAX_OPERATIONS_PER_REQUEST = 50; // API maximum is 50
var YOUTUBE_API_DEVELOPER_KEY = "";
var ua = window.navigator.userAgent.toLowerCase();
if (ua.search("chrome") >= 0)
{
    YOUTUBE_API_DEVELOPER_KEY = "AIzaSyA14y8xNuOkVU-G4GzdOM2H7vmJ78becgA"; // RPYT Chrome key
}
else if (ua.search("firefox") >= 0)
{
    YOUTUBE_API_DEVELOPER_KEY = "AIzaSyCFvw9Ra7JgCWUu6BAGxCus_Zm9bm_U_O0"; // RPYT Firefox key
}

// Configure basic settings
if (localStorage[YTRP_BAR_STYLE_KEY] == undefined)
{
	localStorage[YTRP_BAR_STYLE_KEY] = YTRP_DEFAULT_BAR_STYLE;
}
if (localStorage[YTRP_BAR_THICKNESS_KEY] == undefined)
{
	localStorage[YTRP_BAR_THICKNESS_KEY] = YTRP_DEFAULT_BAR_THICKNESS;
}
if (localStorage[YTRP_HIGHLIGHTED_VIDEOS_KEY] == undefined)
{
	localStorage[YTRP_HIGHLIGHTED_VIDEOS_KEY] = YTRP_DEFAULT_HIGHLIGHTED_VIDEOS;
}
if (localStorage[YTRP_SHOW_RP_SCORE_KEY] == undefined)
{
	localStorage[YTRP_SHOW_RP_SCORE_KEY] = YTRP_DEFAULT_SHOW_RP_SCORE;
}
if (localStorage[YTRP_BAR_OPACITY_KEY] == undefined)
{
	localStorage[YTRP_BAR_OPACITY_KEY] = YTRP_DEFAULT_BAR_OPACITY;
}
if (localStorage[YTRP_PLAYBACK_PROGRESS_BAR_KEY] == undefined)
{
    localStorage[YTRP_PLAYBACK_PROGRESS_BAR_KEY] = YTRP_DEFAULT_PLAYBACK_PROGRESS_BAR;
}

// Configure cache
var YTRP_CACHE_ENABLE; // True or false
var YTRP_CACHE_EXPIRATION; // In milliseconds
if (localStorage[YTRP_CACHING_KEY] == undefined)
{
	localStorage[YTRP_CACHING_KEY] = YTRP_DEFAULT_CACHING;
}
configureCache();

// Set up context menus
chrome.contextMenus.create(
{
	title: "Ratings Preview settings",
	onclick: function (info, tabs)
	{
		chrome.tabs.create({url:chrome.extension.getURL("popup.html")});
	},
	documentUrlPatterns: [ "*://*.youtube.com/*" ]
});

// Check count and new version
var version = chrome.runtime.getManifest().version;
if (localStorage[YTRP_COUNT_KEY] == undefined)
{
	localStorage[YTRP_COUNT_KEY] = 0;
}
if (localStorage[YTRP_VERSION_KEY] == undefined)
{
	// First install, don't bother the user
	localStorage[YTRP_VERSION_KEY] = version;
}
else if (localStorage[YTRP_VERSION_KEY] != version)
{
    // Update, show update successful page
	localStorage[YTRP_VERSION_KEY] = version;
	if (SHOW_UPDATE_NOTICE)
	{
		chrome.tabs.create({url:chrome.extension.getURL("updated.html") + "?platform=chrome&version=" + version + "&count=" + localStorage[YTRP_COUNT_KEY]});
	}
}

// STYLES ////////////////////////////////////////////////////////////////////////////////////////

// Pre-load tokenized style from file (only done once)
var tokenized_style = null;
var req = new XMLHttpRequest();
req.open('GET', chrome.extension.getURL("tokenized_style.css")); // Async request
req.onreadystatechange = function()
{
    if (this.readyState == 4 && this.status == 200)
    {
        tokenized_style = this.responseText;
        generateFullStyle();
    }
};
req.send();

var style = null;
function generateFullStyle()
{
    // Replace tokens

    style = tokenized_style;

    if (localStorage[YTRP_BAR_STYLE_KEY] == 0) // Classic style
    {
        style = style.replace(/\[YTRP_LIKE_COLOR_TOKEN\]/g, "#060");
        style = style.replace(/\[YTRP_SEPARATOR_COLOR_TOKEN\]/g, "#FFF");
        style = style.replace(/\[YTRP_DISLIKE_COLOR_TOKEN\]/g, "#C00");
        style = style.replace(/\[YTRP_HIGHLIGHT_COLOR_TOKEN\]/g, "#00F");
        style = style.replace(/\[YTRP_NORATING_COLOR_TOKEN\]/g, "#AAA");
    }
    else if (localStorage[YTRP_BAR_STYLE_KEY] == 1) // Modern style
    {
        style = style.replace(/\[YTRP_LIKE_COLOR_TOKEN\]/g, "#2793e6");
        style = style.replace(/\[YTRP_SEPARATOR_COLOR_TOKEN\]/g, "#CCC");
        style = style.replace(/\[YTRP_DISLIKE_COLOR_TOKEN\]/g, "#CCC");
        style = style.replace(/\[YTRP_HIGHLIGHT_COLOR_TOKEN\]/g, "#cc181e");
        style = style.replace(/\[YTRP_NORATING_COLOR_TOKEN\]/g, "#CCC");
    }

    style = style.replace(/\[YTRP_BAR_THICKNESS_TOKEN\]/g, localStorage[YTRP_BAR_THICKNESS_KEY]);

    if (localStorage[YTRP_BAR_OPACITY_KEY] == 0)
    {
        style = style.replace(/\[YTRP_BAR_OPACITY_TOKEN\]/g, "0");
    }
    else if (localStorage[YTRP_BAR_OPACITY_KEY] == 1)
    {
        style = style.replace(/\[YTRP_BAR_OPACITY_TOKEN\]/g, "0.2");
    }
    else if (localStorage[YTRP_BAR_OPACITY_KEY] == 2)
    {
        style = style.replace(/\[YTRP_BAR_OPACITY_TOKEN\]/g, "0.4");
    }
    else if (localStorage[YTRP_BAR_OPACITY_KEY] == 3)
    {
        style = style.replace(/\[YTRP_BAR_OPACITY_TOKEN\]/g, "0.5");
    }
    else if (localStorage[YTRP_BAR_OPACITY_KEY] == 4)
    {
        style = style.replace(/\[YTRP_BAR_OPACITY_TOKEN\]/g, "0.6");
    }
    else if (localStorage[YTRP_BAR_OPACITY_KEY] == 5)
    {
        style = style.replace(/\[YTRP_BAR_OPACITY_TOKEN\]/g, "0.7");
    }
    else if (localStorage[YTRP_BAR_OPACITY_KEY] == 6)
    {
        style = style.replace(/\[YTRP_BAR_OPACITY_TOKEN\]/g, "0.8");
    }
    else if (localStorage[YTRP_BAR_OPACITY_KEY] == 7)
    {
        style = style.replace(/\[YTRP_BAR_OPACITY_TOKEN\]/g, "0.9");
    }
    else if (localStorage[YTRP_BAR_OPACITY_KEY] == 8)
    {
        style = style.replace(/\[YTRP_BAR_OPACITY_TOKEN\]/g, "1");
    }

    if (localStorage[YTRP_PLAYBACK_PROGRESS_BAR_KEY] == 0) // Top
    {
        style = style.replace(/\[YTRP_PLAYBACK_PROGRESS_BAR_TOKEN\]/g, "top: 0 !important; visibility: visible !important");
    }
    else if (localStorage[YTRP_PLAYBACK_PROGRESS_BAR_KEY] == 1) // Bottom/Hidden
    {
        if (localStorage[YTRP_BAR_OPACITY_KEY] == 0)
        {
            style = style.replace(/\[YTRP_PLAYBACK_PROGRESS_BAR_TOKEN\]/g, "bottom: 0 !important; visibility: visible !important");
        }
        else
        {
            style = style.replace(/\[YTRP_PLAYBACK_PROGRESS_BAR_TOKEN\]/g, "bottom: 0 !important; visibility: hidden !important");
        }
    }
}

// Inject full style every time we navigate to youtube.com
chrome.webNavigation.onCommitted.addListener(function (details)
{
    if (details.frameId == 0 && style != null) // Not an iframe and full style generated 
    {
        chrome.tabs.insertCSS(details.tabId, { code: style, runAt: "document_start" }); // document_start prevents style glitches
    }
}, { url: [{ hostSuffix: ".youtube.com" }] });

// CORE FUNCTIONALITY ////////////////////////////////////////////////////////////////////////////

// Hashtable holding for every video id, an array of: views [0], likes [1], dislikes [2], and retrieval time [3]
var cacheVideoHashtable = {};
// Hashtable holding for every invalid video id, the retrieval time
var cacheInvalidVideoHashtable = {};

// Pass onHistoryStateUpdated() event to the content script (try{} because sometimes is not defined)
chrome.webNavigation.onHistoryStateUpdated.addListener(function (details)
{
    chrome.tabs.get(details.tabId, function (tab)
    {
        if (tab.url == details.url)
        {
            chrome.tabs.executeScript(details.tabId, { code: "try { onHistoryStateUpdated(); } catch (err) {}", runAt: "document_start" });
        }
    });
}, { url: [{ hostSuffix: ".youtube.com" }] });

// Wire up the listener of the messages so that we can receive them from the scripts
chrome.runtime.onMessage.addListener(onMessage);

// Handles data sent via chrome.runtime.sendMessage()
function onMessage(messageEvent, sender, callback)
{
	switch (messageEvent.name)
	{
	case "injectionDone":
	{
        chrome.pageAction.setIcon({ tabId: sender.tab.id, path: { "19": "favicon19gray.png", "38": "favicon38gray.png" } });
        chrome.pageAction.show(sender.tab.id);
		break;
	}
	case "getStylesheet":
	{
		var stylesheet = chrome.extension.getURL("style.css");
		callback(stylesheet);
		break;
	}
	case "getVideosData":
	{
		fetchVideosData(messageEvent.message, callback);
		return true; // Keep async callback valid (see docs: https://developer.chrome.com/extensions/runtime#event-onMessage)
		break;
	}
	case "wasSuccessful":
	{
        chrome.pageAction.setIcon({ tabId: sender.tab.id, path: { "19": "favicon19.png", "38": "favicon38.png" } });
        chrome.pageAction.show(sender.tab.id);
		break;
	}
	case "clickedWebsiteLink":
	{
		chrome.tabs.create({url:"http://ratingspreview.com"});
		break;
	}
	case "storage_set_style":
	{
        localStorage[YTRP_BAR_STYLE_KEY] = messageEvent.message;
        generateFullStyle();
		break;
	}
	case "storage_set_thickness":
	{
		localStorage[YTRP_BAR_THICKNESS_KEY] = messageEvent.message;
		generateFullStyle();
		break;
	}
	case "storage_set_highlighted":
	{
		localStorage[YTRP_HIGHLIGHTED_VIDEOS_KEY] = messageEvent.message;
		break;
	}
	case "storage_set_showrpscore":
	{
		localStorage[YTRP_SHOW_RP_SCORE_KEY] = messageEvent.message;
		break;
	}
	case "storage_set_opacity":
	{
        localStorage[YTRP_BAR_OPACITY_KEY] = messageEvent.message;
        generateFullStyle();
		break;
	}
    case "storage_set_caching":
    {
        localStorage[YTRP_CACHING_KEY] = messageEvent.message;
        configureCache();
        break;
    }
    case "storage_set_playbackprogressbar":
    {
        localStorage[YTRP_PLAYBACK_PROGRESS_BAR_KEY] = messageEvent.message;
        generateFullStyle();
        break;
    }
	case "storage_get_style":
	{
		callback(localStorage[YTRP_BAR_STYLE_KEY]);
		break;
	}
	case "storage_get_thickness":
	{
		callback(localStorage[YTRP_BAR_THICKNESS_KEY]);
		break;
	}
	case "storage_get_highlighted":
	{
		callback(localStorage[YTRP_HIGHLIGHTED_VIDEOS_KEY]);
		break;
	}
	case "storage_get_showrpscore":
	{
		callback(localStorage[YTRP_SHOW_RP_SCORE_KEY]);
		break;
	}
	case "storage_get_opacity":
	{
		callback(localStorage[YTRP_BAR_OPACITY_KEY]);
		break;
	}
    case "storage_get_caching":
    {
        callback(localStorage[YTRP_CACHING_KEY]);
        break;
    }
    case "storage_get_playbackprogressbar":
    {
        callback(localStorage[YTRP_PLAYBACK_PROGRESS_BAR_KEY]);
        break;
    }
	}
}

// Sets YTRP_CACHE_ENABLE and YTRP_CACHE_EXPIRATION value according to localStorage[YTRP_CACHING_KEY]
function configureCache()
{
	YTRP_CACHE_ENABLE = localStorage[YTRP_CACHING_KEY] > 0;
	YTRP_CACHE_EXPIRATION = 0;
	if (localStorage[YTRP_CACHING_KEY] == 1)
	{
		YTRP_CACHE_EXPIRATION = 5 * 60 * 1000;
	}
	else if (localStorage[YTRP_CACHING_KEY] == 2)
	{
		YTRP_CACHE_EXPIRATION = 30 * 60 * 1000;
	}
	else if (localStorage[YTRP_CACHING_KEY] == 3)
	{
		YTRP_CACHE_EXPIRATION = 60 * 60 * 1000;
	}
	else if (localStorage[YTRP_CACHING_KEY] == 4)
	{
		YTRP_CACHE_EXPIRATION = 2 * 60 * 60 * 1000;
	}
	else if (localStorage[YTRP_CACHING_KEY] == 5)
	{
		YTRP_CACHE_EXPIRATION = 6 * 60 * 60 * 1000;
	}
	else if (localStorage[YTRP_CACHING_KEY] == 6)
	{
		YTRP_CACHE_EXPIRATION = 12 * 60 * 60 * 1000;
	}
	else if (localStorage[YTRP_CACHING_KEY] == 7)
	{
		YTRP_CACHE_EXPIRATION = 24 * 60 * 60 * 1000;
	}
}

// Fetches the data of the videos in the videoIds array
function fetchVideosData(videoIds, callback)
{
	// Return hashtable holding for every video id, an array of: views [0], likes [1], and dislikes [2]
	var videoHashtable = {};
	
	// If the cache is enabled
	if (YTRP_CACHE_ENABLE)
	{
		// Clear the expired cache
		var time = (new Date()).getTime();
		for (var id in cacheVideoHashtable)
		{
			if (time - cacheVideoHashtable[id][3] > YTRP_CACHE_EXPIRATION)
			{
				delete cacheVideoHashtable[id];
			}
		}
		for (var id in cacheInvalidVideoHashtable)
		{
			if (time - cacheInvalidVideoHashtable[id][3] > YTRP_CACHE_EXPIRATION)
			{
				delete cacheInvalidVideoHashtable[id];
			}
		}
		
		// Check if the videos are already cached and in that case move them to the result hashtable directly
		for (var i = videoIds.length - 1; i >= 0; i--)
		{
			if (videoIds[i] in cacheVideoHashtable)
			{
				videoHashtable[videoIds[i]] = [cacheVideoHashtable[videoIds[i]][0], cacheVideoHashtable[videoIds[i]][1], cacheVideoHashtable[videoIds[i]][2]];
				videoIds.splice(i, 1);
			}
			else if (videoIds[i] in cacheInvalidVideoHashtable)
			{
				videoIds.splice(i, 1);
			}
		}
	}
	
	// Check how many requests we have to do depending of YouTube API maximum
	var requestCount = Math.ceil(videoIds.length / YOUTUBE_API_MAX_OPERATIONS_PER_REQUEST);
	var responseCount = 0;
	
	// If there are no videos to be requested (can happen if all of them are cached), count and callback
	if (videoIds.length == 0)
	{
		localStorage[YTRP_COUNT_KEY] = parseInt(localStorage[YTRP_COUNT_KEY]) + Object.keys(videoHashtable).length;
		callback(videoHashtable);
	}
	
	// While there are remaining videos to request
	while (videoIds.length > 0)
	{
		// Divide requests in blocks of YouTube API maximum
		var videoIdsBlock = videoIds.splice(0, YOUTUBE_API_MAX_OPERATIONS_PER_REQUEST);
		
		//DEBUG
		//console.log(videoIdsBlock);
		
		// Compose GET request
		var url = "https://www.googleapis.com/youtube/v3/videos?id=";
		for (var i = 0; i < videoIdsBlock.length; i++)
		{
			url += videoIdsBlock[i];
			if (i + 1 < videoIdsBlock.length)
			{
				url += ",";
			}
		}
		url += "&part=statistics&key=" + YOUTUBE_API_DEVELOPER_KEY;
		
		// Prepare GET request
		var req = new XMLHttpRequest();
		req.open("GET", url); // Async request
		
		// Prepare variable data needed in the callback
		req.videoIdsBlock = videoIdsBlock;
		
		// Register GET request callback
		req.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				//DEBUG
				//console.log(this.responseText.length);
				
				// Response succesfully received, count and add videos info to the hashtable
				responseCount++;
				processVideosData(this.responseText, videoHashtable, this.videoIdsBlock);
				
				//DEBUG
				//console.log(JSON.stringify(videoHashtable));
				
				// If it is the last expected response, count and callback
				if (responseCount == requestCount)
				{
					localStorage[YTRP_COUNT_KEY] = parseInt(localStorage[YTRP_COUNT_KEY]) + Object.keys(videoHashtable).length;
					callback(videoHashtable);
				}
			}
		};
		
		// Send GET request
		req.send();	
	}
}

// Adds the videos info in jsonString to the given video hashtable, updating the cache accordingly taking into account the related videoIdsBlock
function processVideosData(jsonString, hashtable, videoIdsBlock)
{
	// Current time used for caching
	var time = (new Date()).getTime();
	// Flag indicating if at least one valid video was cached
	var validVideosCached = false;
	
	// Get all items (1 per video)
	var items = JSON.parse(jsonString).items;
	
	// For each item, get the views, likes and dislikes
	var id;
	var views;
	var likes;
	var dislikes;
	for (var i = 0; i < items.length; i++)
	{
		try
		{
			id = items[i].id;
			views = parseInt(items[i].statistics.viewCount);
			likes = parseInt(items[i].statistics.likeCount);
			dislikes = parseInt(items[i].statistics.dislikeCount);
			hashtable[id] = [views, likes, dislikes];
			
			// If the cache is enabled, cache valid video
			if (YTRP_CACHE_ENABLE)
			{
				cacheVideoHashtable[id] = [views, likes, dislikes, time];
				validVideosCached = true;
			}
		}
		catch (err)
		{
			// Incorrect entries will not be on the return hashtable, client must check ids
		}
	}
	
	// If valid videos were cached, find and cache invalid videos
	if (validVideosCached)
	{
		for (var i = 0; i < videoIdsBlock.length; i++)
		{
			var videoId = videoIdsBlock[i];
			if (!(videoId in hashtable))
			{
				cacheInvalidVideoHashtable[videoId] = time;
			}
		}
	}
	
	//DEBUG
	//var textContent = jsonString;
	//console.log(Object.keys(hashtable).length + " items: " + textContent);
	//if (textContent.indexOf("Quota exceeded") != -1 && textContent.indexOf("too_many_recent_calls") != -1)
	//{
		//console.log("quota exceeded");
	//}
	
	//DEBUG
	//console.log(Object.keys(cacheVideoHashtable).length + "---" + JSON.stringify(cacheVideoHashtable));
}

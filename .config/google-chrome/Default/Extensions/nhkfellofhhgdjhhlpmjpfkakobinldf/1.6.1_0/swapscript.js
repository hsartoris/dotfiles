var ACTIVE_DICTIONARY = {}; // contains words translated on current page
var PAGE_BLACKLISTED = false;
var DENSITY_LEVEL = 'high';
var DIFFICULTY_LEVEL = 'hard';
var SWAPPED_COUNT = 0;

var RUSSIAN_WORD = ""; // a state var is used because the built-in string.replace only allows 2 arguments
function maintainCaps(match, p1, p2, p3) {
	SWAPPED_COUNT++;
	if(p2.toUpperCase() === p2) return p1 + RUSSIAN_WORD.toUpperCase() + p3;
	if(p2.charAt(0) === p2.charAt(0).toUpperCase()) return p1 + RUSSIAN_WORD.charAt(0).toUpperCase() + RUSSIAN_WORD.slice(1) + p3;
	return p1 + RUSSIAN_WORD + p3;
}

function replaceFromDictionary(text, dictionary) {
	var madeChanges = false;
	for(var i=0;i<dictionary.length;i++) {
		var re = new RegExp("(\\s|^)(" + dictionary[i][0] + ")(\\W|$)", "gi");
		if(text.search(re) !== -1) {
			RUSSIAN_WORD = dictionary[i][1];
			text = text.replace(re, maintainCaps);
			if(ACTIVE_DICTIONARY.hasOwnProperty(dictionary[i][1])) {
				var words = ACTIVE_DICTIONARY[dictionary[i][1]][0].split(/, /);
				if(words.indexOf(dictionary[i][0]) === -1) {
					ACTIVE_DICTIONARY[dictionary[i][1]][0] += ", " + dictionary[i][0];
				}
			} else {
				ACTIVE_DICTIONARY[dictionary[i][1]] = dictionary[i].slice(); // .slice() to make a shallow copy, copied reference = bad
			}
			if(DENSITY_LEVEL === 'low') return text;
			if(madeChanges && DENSITY_LEVEL === 'medium') return text;
			madeChanges = true;
		}
	}
	return text;
}

function replaceAll(text) {
	switch(DIFFICULTY_LEVEL) {
	case 'hard':
		text = replaceFromDictionary(text, HARD_DICTIONARY);
	case 'intermediate':
		text = replaceFromDictionary(text, MEDIUM_DICTIONARY);
	case 'easy':
	default:
		text = replaceFromDictionary(text, EASY_DICTIONARY);
	}
	return text;
}

function containsFormattingChars(str) {
	return (str.indexOf('{') !== -1) || (str.indexOf('<') !== -1);
}

function checkSettingsThen(callback) {
	var url = window.location.hostname;
	chrome.storage.sync.get([url, 'density', 'difficulty'], function(results) {
		if(null != results[url]) {
			PAGE_BLACKLISTED = results[url].blacklist;
			if(!results[url].permanent) {
				chrome.storage.sync.remove(url);
			}
		}
		if(null != results['density']) DENSITY_LEVEL = results['density'];
		if(null != results['difficulty']) DIFFICULTY_LEVEL = results['difficulty'];
		
		callback(results);
	});
}

function findAndReplace() {
	if(PAGE_BLACKLISTED) return;
	var elements = document.getElementsByTagName('*');
	var startTime = Date.now();
	
	//Though this method may seem a bit ugly, it is orders of magnitude faster than jQuery shorthands like .find()
	for(var i=0;i<elements.length;i+=1) {
		var element = elements[i];
		
		for(var j=0;j<element.childNodes.length;j++) {
			if(Date.now() - startTime > 5000) { // If translating takes more than 5 seconds, abort!
				//console.log("Russian Лексика Tool took more than 5 seconds to alter this page.");
				return; 
			}
			var node = element.childNodes[j];
			if(node.nodeType === 3) { // Type 3 = Text
				var text = node.nodeValue;
				if(containsFormattingChars(text)) continue;
				var newText = replaceAll(text);
				if(!!newText) {
					element.replaceChild(document.createTextNode(newText), node);
				}
			}
		}
	}
	console.log("ЛЕКСИКА DEBUG: runtime " + (Date.now() - startTime)/1000 + " seconds. Swapped " + SWAPPED_COUNT + " words.");
}

function getTranslations(text) {
	var words = text.toLowerCase().split(/[^А-Яа-яЁё]/); // all Russian Cyrillic alphabet chars
	var seenWords = {} // hash table to avoid duplicates
	var newText = "";
	var hasWord = false;
	for(var i=0;i<words.length;i++) {
		if(seenWords.hasOwnProperty(words[i])) continue;
		seenWords[words[i]] = true;
		if(ACTIVE_DICTIONARY.hasOwnProperty(words[i])) {
			if(hasWord) newText += "; ";
			newText += ACTIVE_DICTIONARY[words[i]][1] + ": " + ACTIVE_DICTIONARY[words[i]][0];
			hasWord = true;
		}
	}
	return hasWord ? newText : "Highlight text containing Russian words to see their translation.";
}

$().ready(checkSettingsThen(findAndReplace));

document.addEventListener("mouseup", function(ev) {
	chrome.runtime.sendMessage({request: "updateContext", newText: getTranslations(window.getSelection().toString())});
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
		//popup
    if (request.request === "dictionary") {
			checkSettingsThen(function() {sendResponse({dictionary: ACTIVE_DICTIONARY, blacklist: PAGE_BLACKLISTED, density: DENSITY_LEVEL, difficulty: DIFFICULTY_LEVEL})});
		}
		return true;
  });

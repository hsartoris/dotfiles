function getHrefArr(){for(var a=[],b=document.getElementsByTagName("a"),c=0;c<b.length;c++)(0==b[c].href.search(/magnet:/i)||b[c].href.toLowerCase().endsWith(".torrent")||b[c].href.search(/\.torrent\?/i)!=-1)&&a.indexOf(b[c].href)<0&&a.push(b[c].href);return a}function getHrefObj(a){var b={title:document.title,links:a};return b}chrome.runtime.onMessage.addListener(function(a,b,c){var d=getHrefObj(getHrefArr());"getdommagnet"==a.msg&&c({msg:d})});
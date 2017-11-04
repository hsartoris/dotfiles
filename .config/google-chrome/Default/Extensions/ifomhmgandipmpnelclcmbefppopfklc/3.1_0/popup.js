for(name in obj) {
	if(party[name] == 'D') {
		document.write("<li id='name'><p class='candname' id='d'>" + name + "</p></li>");
	}
	else {
		document.write("<li id='name'><p class='candname' id='r'>" + name + "</p></li>");
	}
}

var options = {
    valueNames: [ 'name', 'candname' ],
	page: 700
};

var hackerList = new List('hacker-list', options);


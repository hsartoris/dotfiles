// (c) Nicholas Rubin 2014
// For Greenhouse (www.allaregreen.us)

jQuery(document).ready(function($) {

	$.each(nick, function(key, value) {
		if(party[key] === "D") {
			$("p").highlight(key, {caseSensitive: false, className: 'highlight-67132', wordsOnly:true });
		}
		else {
			$("p").highlight(key, {caseSensitive: false, className: 'highlight-16235', wordsOnly:true });
		}
	});
    
	$('.highlight-67132').each(function() {  	
		
		var currentKey = $(this).text();
		
		//var candExist = jQuery.inArray(currentKey, cand2014);
				
		//if (candExist == -1) {
			
			if(nick[currentKey] == "N00000019" || nick[currentKey] == "N00000528") {
				Tipped.create(this, "https://allaregreen.us/indivs/" + nick[currentKey] + ".php", {
					ajax: { type: 'get' },
					skin: "white",
					hook: 'rightmiddle',
					maxWidth: 205,
					spinner: { 
						radius: 7,
						height: 1,
						width: 2.5,
						dashes: 30,
						opacity: 1,
						padding: 10,
						rotation: 700,
						color: '#000000'
					},
				});	
			} else {
				Tipped.create(this, "https://allaregreen.us/greenhouse_2014.php", {
					ajax: { data: {id: nick[currentKey], pctg: pcts[currentKey], acdc: acdc[currentKey], bioguide: bioguide[currentKey]}, type: 'post' },
					skin: "white",
					hook: 'rightmiddle',
					maxWidth: 205,
					spinner: { 
						radius: 7,
						height: 1,
						width: 2.5,
						dashes: 30,
						opacity: 1,
						padding: 10,
						rotation: 700,
						color: '#000000'
					},
				});	
			}
		
			/*} else {
	    	
				Tipped.create(this, "http://allaregreen.us/greenhouse_2014_cand.php", {
				ajax: { data: {id: nick[currentKey], pctg: pcts[currentKey], acdc: acdc[currentKey], bioguide: bioguide[currentKey]}, type: 'post' },
				skin: "white",
				hook: 'rightmiddle',
				maxWidth: 430,
				spinner: { 
				radius: 7,
				height: 1,
				width: 2.5,
				dashes: 30,
				opacity: 1,
				padding: 10,
				rotation: 700,
				color: '#000000'
				},
				});	
			
				}*/
		
			});
    
			$('.highlight-16235').each(function() {  	
		  
				var currentKey = $(this).text();	
		
				//var candExist = jQuery.inArray(currentKey, cand2014);
				
				//if (candExist == -1) {
					
					if(nick[currentKey] == "N00023864" || nick[currentKey] == "N00033085") {
						Tipped.create(this, "https://allaregreen.us/indivs/" + nick[currentKey] + ".php", {
							ajax: { type: 'get' },
							skin: "white",
							hook: 'rightmiddle',
							maxWidth: 205,
							spinner: { 
								radius: 7,
								height: 1,
								width: 2.5,
								dashes: 30,
								opacity: 1,
								padding: 10,
								rotation: 700,
								color: '#000000'
							},
						});	
					} else {
						Tipped.create(this, "https://allaregreen.us/greenhouse_2014.php", {
							ajax: { data: { id: nick[currentKey], pctg: pcts[currentKey], acdc: acdc[currentKey], bioguide: bioguide[currentKey]}, type: 'post' },
							skin: "white",
							hook: 'rightmiddle',
							maxWidth: 205,
							spinner: { 
								radius: 7,
								height: 1,
								width: 2.5,
								dashes: 30,
								opacity: 1,
								padding: 10,
								rotation: 700,
								color: '#000000'
							},
						});
					}
		
					/*} else {
	    	
						Tipped.create(this, "http://allaregreen.us/greenhouse_2014_cand.php", {
						ajax: { data: { id: nick[currentKey], pctg: pcts[currentKey], acdc: acdc[currentKey], bioguide: bioguide[currentKey]}, type: 'post' },
						skin: "white",
						hook: 'rightmiddle',
						maxWidth: 430,
						spinner: { 
						radius: 7,
						height: 1,
						width: 2.5,
						dashes: 30,
						opacity: 1,
						padding: 10,
						rotation: 700,
						color: '#000000'
						},
						});
			
						}*/
					});
				});


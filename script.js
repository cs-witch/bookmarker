 /*  next versions- create an alert for each submission.
alert for Site Name and URL each time it's entered. 
add : is there a way to double-check if an entry is correct? how do we do this?
}
*/

// console.log("Hello from Javascript");

// create an event listener for form submit
document.querySelector('#myForm').addEventListener('submit', saveBookmark);

// Save Bookmarks
function saveBookmark(e) {
	e.preventDefault();
	//console.log("You have successfully bookmarked this site!"); //alert vs console.log?

	// Get user input 
	var siteName = document.querySelector('#siteName').value;
	//	console.log(siteName); // querySelector is same as getElementById but no need for extra functions
	var siteURL = document.getElementById('siteURL').value;
	// console.log(siteURL);

	// create an object for bookmark
	var bookmark = {
		name: siteName,
		url: siteURL
	};

	//console.log(bookmark); 

	//check if the bookmarks array exists
	if(localStorage.getItem('bookmarks') === null) {
		// init bookmarks array
		var bookmarks = [];

		// add new bookmark into array
		bookmarks.push(bookmark);
		// set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// get bookmarks from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// add new bookmark into bookmarks
		bookmarks.push(bookmark);
		//reset bookmarks to localStorage
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

	}		
	// reset the form
	document.querySelector('#myForm').reset();

	fetchBookmarks();
}
// fetch bookmarks
function fetchBookmarks(){
	// Get bookmarks from localStorage
	var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));

	// Get the output div by id
	var bookmarksResult = document.querySelector('#bookmarksResult');

	console.log(bookmarks);

	// Reset the output div
	bookmarksResult.innerHTML = "";

	// Loop through bookmarks
	for(var i=0; i<bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		// THERE HAS TO BE AN EASIER WAY to format this!! other than parse 
		bookmarksResult.innerHTML +=
		"<div>" +
		"<h3>" +
		name + 
		" " +
		'<a class= "btn btn-success" href="" ' + 
		url + 
		'">Visit</a> ' +
		'<button class= "btn btn-danger" onclick= "deleteBookmark(\''  +
		name +
		"')\">Delete</button>" +
		"</h3>" +
		"</div>";			 
		// is the easier way bookmarksResult.insertAdjacentHTML() ??
	}
}

function deleteBookmark(name) {
	// console.log(name);

	// Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// loop through bookmarks
	for(var i=0; i<bookmarks.length; i++) {
		// remive the bookmark with given name
		if(bookmarks[i].name === name) {
			bookmarks.splice(i, 1);
			break;
		}
	}	

	// reset bookmarks back to localStorage
	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

	// Re-fetch bookmarks Results
	fetchBookmarks();
}




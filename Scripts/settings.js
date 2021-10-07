var settings = {
	dom: document.getElementById("settingsStatusOutput"),
	checkForUpdates: function() {
		var xhttps = new XMLHttpRequest();
		xhttps.addEventListener("load", function() {
			console.log(this.status);
			if (this.status == 200) {
				console.log(this.responseText);
			}
		});
		xhttps.open("GET", "https://github.com/https123456789/Textual/blob/main/HTTPS/version.txt");
		xhttps.send();
	}
}
var settings = {
	updateDom: document.getElementById("updateStatusOutput"),
	checkForUpdates: function() {
		var xhttps = new XMLHttpRequest();
		xhttps.addEventListener("load", function() {
			if (this.status == 200) {
				console.log(this.responseText);
				if (this.responseText == GLOBAL.VERSION) {
					settings.updateDom.innerHTML = "<p>You have the latest version.</p>";
				} else {
					var downloadLoc = "https://github.com/https123456789/Textual/raw/main/Releases/" + this.responseText + "/Textual " + this.responseText + ".zip";
					settings.updateDom.innerHTML = "<details><summary>Update Available</summary><p>" + this.responseText + "</p><p>Download is available <a href='" + downloadLoc + "'>here</a>.</p><p>You can also download from here.</p><button onclick='settings.downloadLatestVersion()' class='updateButton'>Download</button></details>";
				}
			}
		});
		xhttps.open("GET", "https://https123456789.github.io/Textual/HTTPS/version.txt");
		xhttps.send();
	},
	downloadLatestVersion: function() {
		console.log("Downloading latest version...");
	}
}
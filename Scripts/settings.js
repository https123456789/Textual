var settings = {
	updateDom: document.getElementById("updateStatusOutput"),
	themeName: "light",
	latestVersion: null,
	getInfo: function() {
		this.checkForUpdates();
		this.loadThemeInterface();
	},
	checkForUpdates: function() {
		var xhttps = new XMLHttpRequest();
		xhttps.addEventListener("load", function() {
			if (this.status == 200) {
				if (this.responseText == GLOBAL.VERSION) {
					settings.updateDom.innerHTML = "<p>You have the latest version.</p>";
				} else {
					settings.latestVersion = this.responseText;
					var downloadLoc = "https://github.com/https123456789/Textual/raw/main/Releases/" + this.responseText + "/Textual " + this.responseText + ".zip";
					settings.updateDom.innerHTML = "<fieldset><legend><h2>Update Available</h2></legend><button onclick='settings.downloadLatestVersion()' class='updateButton'>Download " + settings.latestVersion + "</button></filedset>";
				}
			}
		});
		xhttps.open("GET", "https://https123456789.github.io/Textual/HTTPS/version.txt");
		xhttps.send();
	},
	downloadLatestVersion: function() {
		console.log("Downloading latest version...");
		/*var xhttp = new XMLHttpRequest();
		xhttp.addEventListener("load", function() {
			if (this.status == 200) {
				console.log(this.responseText);
			} else {
				console.log("Unable to download: " + this.status);
			}
		});
		xhttp.open("GET", "https://https123456789.github.io/Releases/" + settings.latestVersion + "/" + settings.latestVersion + ".zip");
		xhttp.send();*/
		location.replace("https://github.com/https123456789/Textual/raw/main/Releases/" + this.latestVersion + "/Textual " + this.latestVersion + ".zip");
	},
	loadThemeInterface: function() {
		var themeLabel = document.getElementById("themeLabel");
		var themeSample = document.getElementById("themeSample_menuColor");
		var theme = this.getTheme();
		theme = theme.charAt(0).toUpperCase() + theme.slice(1);
		switch (theme) {
			case "Light":
				themeSample.style.fill = 'rgb(200, 200, 200)';
				break;
			default:
				themeSample.style.fill = 'rgb(255, 0, 0)';
				break;
		}
		themeLabel.innerHTML = theme;
	},
	getTheme: function() {
		return(this.themeName);
	},
	setTheme: function(theme) {
		this.themeName = theme;
	}
}
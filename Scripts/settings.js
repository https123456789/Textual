var settings = {
	updateDom: document.getElementById("updateStatusOutput"),
	themeName: localStorage.getItem("themeName"),
	latestVersion: null,
	getInfo: function() {
		this.checkForUpdates();
		this.loadThemeInterface();
	},
	updateSettings: function() {
		this.checkForUpdates();
		this.updateThemeInterface();
		this.updateStyles();
	},
	updateStyles: function() {
		var theme = localStorage.getItem("themeName");
		var sheet = document.styleSheets[1];
		for (var i = 0; i < themes[theme].length; i++) {
			sheet.cssRules[themes.Model[i]].style[themes.RuleIndex[i]] = themes[theme][i];
		}
		document.getElementById("themeLabel").innerHTML = theme;
	},
	checkForUpdates: function() {
		var versionLabel = document.getElementById("versionLabel");
		versionLabel.innerHTML = GLOBAL.VERSION;
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
		location.replace("https://github.com/https123456789/Textual/raw/main/Releases/" + this.latestVersion + "/Textual " + this.latestVersion + ".zip");
	},
	updateThemeInterface: function() {
		var themeLabel = document.getElementById("themeLabel");
		var themeSelect = document.getElementById("themeSelector");
		var theme = this.getTheme();
		theme = theme.charAt(0).toUpperCase() + theme.slice(1);
		var opts = "";
		for (var i = 0; i < themes.Themes.length; i++) {
			opts = opts.concat("<option value='" + themes.Themes[i] + "'>" + themes.Themes[i] + "</option>");
		}
		themeSelect.innerHTML = opts;
	},
	loadThemeInterface: function() {
		this.updateThemeInterface();
		var theme = this.getTheme();
		theme = theme.charAt(0).toUpperCase() + theme.slice(1);
		themeLabel.innerHTML = theme;
		document.getElementById("themeSelector").value = theme;
		var details = document.getElementById("settings_view_pane").getElementsByTagName("details");
		for (var i = 0; i < details.length; i++) {
			details[i].removeAttribute("open");
		}
	},
	getTheme: function() {
		return(this.themeName);
	},
	setTheme: function(theme) {
		this.themeName = theme;
		this.saveSettings();
	}, 
	saveSettings: function() {
		var theme = this.themeName;
		localStorage.setItem("themeName", theme);
		this.updateSettings();
	}
}
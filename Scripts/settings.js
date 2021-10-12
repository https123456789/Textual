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
		this.loadThemeInterface();
		this.updateStyles();
	},
	updateStyles: function() {
		var theme = localStorage.getItem("themeName");
		theme = theme.charAt(0).toUpperCase() + theme.slice(1);
		var sheet = document.styleSheets[0];
		var editorRule = sheet.cssRules[8];
		var toolbarRule = sheet.cssRules[1];
		var actionsbarRule = sheet.cssRules[4];
		switch (theme) {
			case "Light":
				editorRule.style.backgroundColor = themes.Light.textEditorColor;
				editorRule.style.color = themes.Light.textEditorTextColor;
				break;
			case "Dark":
				editorRule.style.backgroundColor = themes.Dark.textEditorColor;
				editorRule.style.color = themes.Dark.textEditorTextColor;
				break;
		}
		console.log("Updated Settings");
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
	loadThemeInterface: function() {
		var themeLabel = document.getElementById("themeLabel");
		var themeSample = document.getElementById("themeSample");
		var menuColorSample = document.getElementById("themeSampleMenuColor");
		var editorColorSample = document.getElementById("themeSampleEditorColor");
		var theme = this.getTheme();
		theme = theme.charAt(0).toUpperCase() + theme.slice(1);
		switch (theme) {
			case "Light":
				menuColorSample.style.fill = themes.Light.menuColor;
				editorColorSample.style.fill = themes.Light.textEditorColor;
				break;
			case "Dark":
				menuColorSample.style.fill = themes.Dark.menuColor;
				editorColorSample.style.fill = themes.Dark.textEditorColor;
				break;
			default:
				themeSample.style.display = "none";
				break;
		}
		themeLabel.innerHTML = theme;
		document.getElementById("themeSelector").value = theme;
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
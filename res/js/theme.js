class ThemeManager {
	constructor() {
		this.loaderDom = document.getElementById("themeManager-loader-section");
		this.themeSelector = document.getElementById("themeSelector");
		this.availableThemes = [];
	}
	init() {
		this.currentTheme = localStorage.getItem("theme");
		this.setTheme(this.currentTheme);
		this.loadAvailableThemes();
	}
	loadAvailableThemes() {
		var el = document.createElement("script");
		el.src = "themes/index.js";
		el.id = "themesIndexScript";
		document.body.appendChild(el);
	}
	registerThemes(data) {
		data.themes.forEach((item) => {
			this.availableThemes.push(item);
		});
	}
	updateThemeSelector() {
		// Clear selector
		while(this.themeSelector.firstChild) {
			this.themeSelector.removeChild(
				this.themeSelector.lastChild
			);
		}
		// Fill selector
		this.availableThemes.forEach((item) => {
			var opt = document.createElement("option");
			opt.value = item.filePath;
			opt.innerHTML = item.name;
			this.themeSelector.appendChild(opt);
		});
	}
	loadThemeSheet(themeName) {
		// Clear current theme sheet loaded
		while (this.loaderDom.firstChild) {
			this.loaderDom.removeChild(this.loaderDom.lastChild);
		}
		// Create the new theme sheet
		var newThemeSheet = document.createElement("link");
		newThemeSheet.rel = "stylesheet";
		newThemeSheet.href = "themes/" + themeName + "?rnd=1";
		// Add the theme sheet
		this.loaderDom.appendChild(newThemeSheet);
	}
	setTheme(themeName) {
		this.currentTheme = themeName;
		this.loadThemeSheet(themeName);
		localStorage.setItem("theme", themeName);
		console.log("Set theme to " + this.currentTheme);
	}
	setThemeFromSelector() {
		this.setTheme(this.themeSelector.value);
	}
}
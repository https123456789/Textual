class ThemeManager {
	constructor() {
		this.loaderDom = document.getElementById("themeManager-loader-section");
		this.themeSelector = document.getElementById("themeSelector");
		this.themeSelector.addEventListener("change", (event) => {
			this.setThemeFromSelector();
		});
		this.availableThemes = {
			optGroups: [],
			themes: []
		};
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
		data.optGroups.forEach((item) => {
			this.availableThemes.optGroups.push(item);
		});
		data.themes.forEach((item) => {
			this.availableThemes.themes.push(item);
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
		this.availableThemes.optGroups.forEach((item) => {
			var containerEl = document.createElement("optgroup");
			containerEl.label = item.fullName;
			this.availableThemes.themes.forEach((citem) => {
				if (citem.optGroup.name != item.name) {
					return;
				}
				var opt = document.createElement("option");
				opt.value = citem.filePath;
				opt.innerHTML = citem.name;
				containerEl.appendChild(opt);
			});
			this.themeSelector.appendChild(containerEl);
		});
		this.themeSelector.value = this.currentTheme;
	}
	loadThemeSheet(themeName) {
		// Clear current theme sheet loaded
		while (this.loaderDom.firstChild) {
			this.loaderDom.removeChild(this.loaderDom.lastChild);
		}
		// Create the new theme sheet
		var newThemeSheet = document.createElement("link");
		newThemeSheet.rel = "stylesheet";
		newThemeSheet.href = "themes/" + themeName + "";
		// Add the theme sheet
		this.loaderDom.appendChild(newThemeSheet);
	}
	setTheme(themeName) {
		this.currentTheme = themeName;
		this.loadThemeSheet(themeName);
		localStorage.setItem("theme", themeName);
		this.themeSelector.value = themeName;
		console.log("Set theme to " + this.currentTheme);
	}
	setThemeFromSelector() {
		this.setTheme(this.themeSelector.value);
	}
}
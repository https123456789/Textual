var editor = new Editor();
var themeManager = new ThemeManager();
var settingsManager = new SettingsManager();

function firstRun() {
	// First run - init settings and theme
	localStorage.setItem("firstRun", "false");
	localStorage.setItem("theme", DEFAULTS.THEME);
}

function factoryReset() {
	// Clear localstorage
	localStorage.clear();
	// Reload page
	window.location.reload();
}

// Check if this is the first run	
if (!localStorage.getItem("firstRun")) {
	firstRun();
}
// Load theme
themeManager.init();

var disableInteractionsMesh = document.getElementById("disableInteractionsMesh");

// Create views
var aboutView = new View(
	document.getElementById("about-view"),
	disableInteractionsMesh
);
var settingsView = new View(
	document.getElementById("settings-view"),
	disableInteractionsMesh
);
var saveView = new View(
	document.getElementById("save-view"),
	disableInteractionsMesh
);

// Update contributors list
updateContributorsList();

// Init settings
settingsManager.init();

// Hot keys
document.addEventListener("keydown", (event) => {
	if ((window.navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)  && event.keyCode == 83) {
    event.preventDefault();
    saveView.show();
  }
});
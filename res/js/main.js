var editor = new Editor();
var themeManager = new ThemeManager();
var settingsManager = new SettingsManager();
var extrasManager = new ExtrasManager();

function firstRun() {
	// First run - init settings and theme
	localStorage.setItem("firstRun", "false");
	localStorage.setItem("theme", DEFAULTS.THEME);
	localStorage.setItem("extrasStore", JSON.stringify([
		
	]));
	localStorage.setItem("extrasIdStore", JSON.stringify([
		"-1",
		"0",
		"1"
	]));
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
var extrasView = new View(
	document.getElementById("extras-view"),
	disableInteractionsMesh
);
var extrasConsoleView = new View(
	document.getElementById("extras-console-view"),
	disableInteractionsMesh
);

// Init settings
settingsManager.init();

// Init extras
document.onreadystatechange = (event) => {
	if (document.readyState != "complete") {
		return;
	}
	extrasManager.init();
}

// Update contributors list
updateContributorsList();

// Hot keys
document.addEventListener("keydown", (event) => {
	if ((window.navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)) {
		if (event.key == "s") {
			event.preventDefault();
		    saveView.show();
		}
		if (event.key == "i") {
			event.preventDefault();
		    extrasConsoleView.show();
		}
  }
});

// Window posts
window.addEventListener("message", (event) => {
	console.log("Window reviced message from: " + event.origin + ".");
	if (event.origin == window.location.origin) {
		var messageData = JSON.parse(event.data);
		switch (messageData.type) {
			case "console-msg":
				console.log(messageData.payload);
				break;
		}
	} else {
		console.warn("Window revived a message from an untrusted source: " + event.origin + ".");
	}
}, false);
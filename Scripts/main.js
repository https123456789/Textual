/* Init */
var allViewsContentLoaded = false;
document.getElementById("fontSizeSelect").value = "12px";

var aboutView = new View(
	document.getElementById("about_view_pane"),
	document.getElementById("disableInteractionsMesh"),
	document.getElementById("about_view_pane_content"),
	"about"
);
var extrasView = new View(
	document.getElementById("extras_view_pane"),
	document.getElementById("disableInteractionsMesh"),
	document.getElementById("extras_view_pane_content"),
	"extras"
);
var extrasMarketplaceView = new Overview(
	document.getElementById("extras_marketplace_view_pane"),
	document.getElementById("disableInteractionsMesh"),
	document.getElementById("extras_marketplace_pane_content"),
	"extras marketplace"
);
var settingsView = new SettingsView(
	document.getElementById("settings_view_pane"),
	document.getElementById("disableInteractionsMesh"),
	document.getElementById("settings_view_pane_content"),
	"settings"
);
var saveView = new SaveView(
	document.getElementById("save_view_pane"),
	document.getElementById("disableInteractionsMesh"),
	document.getElementById("download_file"),
	document.getElementById("save_view_pane_content"),
	"save"
);
var views = [
	aboutView,
	extrasView,
	extrasMarketplaceView,
	settingsView,
	saveView
];
var popup = null;
var editor = {
	content: "Textual Beta 1.0",
	formattedContent: "Textual Beta 1.0",
	dom: document.getElementById("editor"),
	init: function() {
		this.dom.innerHTML = this.content;
		settings.updateStyles();
	},
	update: function() {
		this.content = this.dom.innerHTML;
		this.formatWhiteSpace();
	},
	formatWhiteSpace: function() {
		var content = this.content;
		var result = content.replaceAll("<div>", "\n");
		result = result.replaceAll("</div>", "");
		this.formattedContent = result;
	},
	save: function(dom) {
		var content = this.content;
		var fileType = "text/plain";
		var blob = new Blob([content], {
			type: fileType
		});
		var link = document.createElement("a");
		link.download = "file.txul";
		link.href = window.URL.createObjectURL(blob);
		link.innerHTML = "Download";
		link.click();
	},
	exportAs: function() {
		var exportType = document.getElementById("fileExportTypeinput").value;
		var exporter;
		switch (exportType) {
			case "text/plain":
				exporter = new PlainTextExporter({
					"name": "doc",
					"extension": "txt"
				}, this.content);
				break;
			case "text/html":
				exporter = new HTMLExporter({
					"name": "doc",
					"extension": "html"
				}, this.content);
				break;
		}
		exporter.exportToFile();
	}
}

editor.init();
var updateLoop = setInterval(update, 100);

function openMarketplace() {
	/*extrasView.hide(
		document.getElementById('extras_view_pane'),
		document.getElementById('disableInteractionsMesh')
	);*/
	extrasMarketplaceView.show();
}

function update() {
	editor.update();
}

function firstRun() {
	localStorage.setItem("themeName", DEFAULTS.THEME);
	var popupText = new PopupText({
		"header": "First Run!",
		"body": "<p>It is your first run!</p><p>Need help? Email me at <a href='mailto:textualemail@gmail.com'>textualemail@gmail.com</a></p>",
		"footer": "Developer? Check out the <a href='https://github.com/https123456789/Textual/'>Github Repo</a>."
	});
	popup = new Popup(document.getElementById("popups"), document.getElementById("disableInteractionsMesh"), popupText.parse(), waitForInput=false, disableMeshHide=true);
}

function factoryReset() {
	localStorage.removeItem("firstRun");
	localStorage.setItem("themeName", DEFAULTS.THEME);
	location.reload();
}
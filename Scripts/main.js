/* Init */
document.getElementById("fontSizeSelect").value = "12px";
settings.updateStyles();

var aboutView = new View(document.getElementById("about_view_pane"), document.getElementById("disableInteractionsMesh"));
var settingsView = new SettingsView(document.getElementById("settings_view_pane"), document.getElementById("disableInteractionsMesh"));
var saveView = new SaveView(document.getElementById("save_view_pane"), document.getElementById("disableInteractionsMesh"), document.getElementById("download_file"));
var popup = null;
var editor = {
	content: "Textual Beta 1.0",
	formattedContent: "Textual Beta 1.0",
	dom: document.getElementById("editor"),
	init: function() {
		this.dom.innerHTML = this.content;
	},
	update: function() {
		this.content = this.dom.innerHTML;
		this.formatWhiteSpace();
	},
	formatWhiteSpace: function() {
		var content = this.content;
		var result = content.replaceAll("<div>", "\n");
		result = result.replaceAll("</div>", "")
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
		//dom.innerHTML = "";
		//dom.innerHTML += "<a href='" + link + "' download='file.txul' hidden>Download</a>";
	},
	exportAs: function() {
		var content = this.formattedContent;
		var fileType = document.getElementById("popup_input").value;
		var blob = new Blob([content], {
			type: fileType
		});
		var link = document.createElement("a");
		link.download = "file.txt";
		link.href = window.URL.createObjectURL(blob);
		link.innerHTML = "Download";
		link.click();
		//dom.innerHTML = "";
		//dom.innerHTML += "<a href='" + link + "' download='file.txt' hidden>Download</a>";
	}
}

editor.init();
var updateLoop = setInterval(update, 100);

function update() {
	editor.update();
}

function firstRun() {
	var popupText = new PopupText({
		"header": "First Run!",
		"body": "<p>It is your first run!</p><p>Need help? Email me at <a href='mailto:textualemail@gmail.com'>textualemail@gmail.com</a></p>",
		"footer": "Developer? Check out the <a href='https://github.com/https123456789/Textual/'>Github Repo</a>."
	});
	popup = new Popup(document.getElementById("popups"), document.getElementById("disableInteractionsMesh"), popupText.parse(), waitForInput=false, disableMeshHide=true);
}

function factoryReset() {
	localStorage.removeItem("firstRun");
	localStorage.setItem("themeName", "Sky");
	location.reload();
}
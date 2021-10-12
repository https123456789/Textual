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
		var popupText = new PopupText({
			header: "Select File Type:",
			body: "<select id='popup_input'><option value='text/plain'>Plain Text</option></select>"
		});
		popup = new Popup(document.getElementById("popups"), document.getElementById("disableInteractionsMesh"), popupText.parse(), waitForInput=false);
		var content = this.formattedContent;
		var fileType = document.getElementById("popup_input").value;
		var blob = new Blob([content], {
			type: fileType
		});
		var link = document.createElement("a");
		link.download = "file.txt";
		link.href = window.URL.createObjectURL(blob);
		link.innerHTML = "Download";
		dom.innerHTML = "";
		dom.innerHTML += "<a href='" + link + "' download='file.html'>Download</a>";
	}
}

editor.init();
var updateLoop = setInterval(update, 100);

function update() {
	editor.update();
}
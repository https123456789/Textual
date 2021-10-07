var aboutView = new View(document.getElementById("about_view_pane"));
var settingsView = new View(document.getElementById("settings_view_pane"));
var saveView = new SaveView(document.getElementById("save_view_pane"), document.getElementById("download_file"));
var editor = {
	content: "Textual Alpha",
	formattedContent: "Textual Alpha",
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
		var content = this.formattedContent;
		var blob = new Blob([content], {
			type: "text/plain"
		});
		var link = document.createElement("a");
		link.download = "file.txt";
		link.href = window.URL.createObjectURL(blob);
		link.innerHTML = "Download";
		dom.innerHTML = "";
		dom.innerHTML += "<a href='" + link + "' download='file.txt'>Download</a>";
	}
}

editor.init();
var updateLoop = setInterval(update, 100);

function update() {
	editor.update();
}
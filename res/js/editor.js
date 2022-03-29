class Editor {
	constructor() {
		this.domRef = document.getElementById("editor");
		this.content = "Textual " + GLOBAL.VERSION;
		this.domRef.value = this.content;
		this.domRef.addEventListener("keydown", (event) => {
			this.keydown(event);
		});
	}
	keydown(event) {
		var cursorPositionS = event.target.selectionStart;
		var cursorPositionE = event.target.selectionEnd;
		if (event.keyCode == 9) {
			event.preventDefault();
			console.log("tab");
			event.target.innerHTML = event.target.innerHTML.slice(0, cursorPositionS) + "\t" + event.target.innerHTML.slice(cursorPositionE, event.target.innerHTML.length);
			event.target.focus();
			event.target.setSelectionRange(cursorPositionS, cursorPositionE);
		}
	}
	save() {
		this.content = this.domRef.value;
		this.giveUserDownload("text/plain", "document.textual");
	}
	saveAs() {
		this.content = this.domRef.value;
		var contentType = document.getElementById("exportCtpicker").value;
		console.log(contentType);
		var fe = "";
		switch (contentType) {
			case "text/plain":
				fe = "txt";
				break;
			case "text/html":
				fe = "html";
				break;
			case "application/json":
				fe = "json";
				break;
		}
		this.giveUserDownload(contentType, "document." + fe);
	}
	giveUserDownload(contentType, filename) {
		console.log("Saving " + filename + " as " + contentType);
		var linkElement = document.createElement("a");
		var blob = new Blob([this.content], {
			type: contentType
		});
		linkElement.href = URL.createObjectURL(blob);
		linkElement.download = filename;
		linkElement.click();
	}
}
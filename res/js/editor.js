class Editor {
	constructor() {
		this.domRef = document.getElementById("editor");
		var gQuery = new URLSearchParams(window.location.search);
		if (gQuery.get("content")) {
			this.content = gQuery.get("content");
		} else {
			this.content = "Textual " + GLOBAL.VERSION;
		}
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
	copyDocumentURL(t) {
		this.content = this.domRef.value;
		var c = window.location.href.split('?')[0] +
			"?content=" +
			encodeURIComponent(this.content);
		navigator.clipboard.writeText(c).then(() => {
			var ne = document.getElementById("notification");
			ne.innerHTML = "URL Copied to clipboard.";
			ne.style.display = "block";
			t.disabled = true;
			t.classList.add("btn-thinking");
			t.innerHTML = "Copying";
			window.setTimeout(() => {
				ne.classList.add("notification-slide-out");
				window.setTimeout(() => {
					ne.classList.remove("notification-slide-out");
					t.disabled = false;
					ne.style.display = "none";
					t.classList.remove("btn-thinking");
					t.innerHTML = "Copy";
				}, 2000);
			}, 5000);
		}, (err) => {
			var ne = document.getElementById("notification");
			ne.innerHTML = "Error copying to clipboard.";
			ne.style.display = "block";
			window.setTimeout(() => {
				ne.classList.add("notification-slide-out");
				window.setTimeout(() => {
					ne.classList.remove("notification-slide-out");
					t.disabled = false;
					ne.style.display = "none";
					t.classList.remove("btn-thinking");
					t.innerHTML = "Copy";
				}, 2000);
			}, 5000);
		});
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
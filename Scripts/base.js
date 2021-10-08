class View {
	constructor(domObj, ddomObj) {
		this.dom = domObj;
		this.disableMesh = ddomObj;
	}
	show() {
		this.dom.style.animationName = "zoomToFill-bound-5";
		this.dom.style.animationDuration = "1.s";
		this.dom.style.display = "block";
		this.disableMesh.style.display = "block";
	}
	hide(domObj, ddomObj) {
		this.dom.style.animationName = "shrink-bound-5";
		this.dom.style.animationDuration = "1s";
		this.dom.addEventListener("animationend", function() {
			console.log("Closing animation ended.");
			domObj.style.animationName = "zoomToFill-bound-5";
			domObj.style.animationDuration = "0.5s";
			console.log("Animations reset.");
			domObj.style.display = "none";
			ddomObj.style.display = "none";
		});
	}
}
class SaveView extends View {
	constructor(domObj, ddomObj, downDomObj) {
		super(domObj, ddomObj);
		this.downloadDom = downDomObj;
	}
	show() {
		this.dom.style.display = "block";
		this.disableMesh.style.display = "block";
		editor.save(this.downloadDom);
	}
}
class SettingsView extends View {
	constructor(domObj, ddomObj) {
		super(domObj, ddomObj);
		this.dom = domObj;
		this.disableMesh = ddomObj;
	}
	show() {
		settings.checkForUpdates();
		var versionLabel = document.getElementById("versionLabel");
		versionLabel.innerHTML = GLOBAL.VERSION;
		this.dom.style.display = "block";
		this.disableMesh.style.display = "block";
	}
}
class PopupText {
	constructor(textObj) {
		this.raw = textObj;
		this.parsed = null;
		this.header = null;
		this.footer = null;
		this.body = null;
	}
	parse() {
		if (this.raw.hasOwnProperty("header")) {
			this.header = "<h2>" + this.raw.header + "</h2>";
		} else {
			this.header = "";
		}
		if (this.raw.hasOwnProperty("footer")) {
			this.footer = "<h6>" + this.raw.footer + "</h6>";
		} else {
			this.footer = "";
		}
		if (this.raw.hasOwnProperty("body")) {
			this.body = "<p>" + this.raw.body + "</p>";
		} else {
			this.body = "";
		}
		this.parsed = this.header + this.body + this.footer;
		return(this.parsed);
	}
}
class Popup {
	constructor(domObj, disableMeshObj, message, waitForInput=false, inputObjects={}) {
		this.dom = domObj;
		this.disableMesh = disableMeshObj;
		this.message = message;
		this.closeButton = 	"<button id='popupDismissButton' class='popup-close-button'>Close</button>";
		this.wait = waitForInput;
		this.inputObjects = inputObjects;
		this.value = "";
		this.values = [];
		this.closed = false;
		this.open();
	}
	open() {
		this.disableMesh.style.display = "block";
		this.dom.style.display = "block";
		this.disableMesh.style.zIndex = "11";
		this.dom.innerHTML = this.message + this.closeButton;
		var dismissButton = document.getElementById("popupDismissButton");
		dismissButton.addEventListener("click", function() {
			if (popup.wait) {
				for (var inputObject in this.inputObjects) {
					this.values[inputObject.index] = document.getElementById(inputObject.dom);
				}
				if (popup.value == "") {
					return;
				} else {
					popup.close();
				}
			} else {
				popup.close();
			}
		});
	}
	close() {
		this.disableMesh.style.zIndex = "10";
		this.dom.style.display = "none";
	}
}
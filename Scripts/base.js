class View {
	constructor(domObj) {
		this.dom = domObj;
		this.disableMesh = document.getElementById("disableInteractionsMesh");
	}
	show() {
		this.dom.style.display = "block";
		this.disableMesh.style.display = "block";
	}
	hide() {
		this.dom.style.display = "none";
		this.disableMesh.style.display = "none";
	}
}
class SaveView extends View {
	constructor(domObj, ddomObj) {
		super(domObj);
		this.downloadDom = ddomObj;
	}
	show() {
		this.dom.style.display = "block";
		this.disableMesh.style.display = "block";
		editor.save(this.downloadDom);
	}
}
class Popup {
	constructor(domObj, disableMeshObj, message) {
		this.dom = domObj;
		this.disableMesh = disableMeshObj;
		this.message = message;
		this.closeButton = 	"<button id='popupDismissButton' style='width:60vw;position:fixed;right:20vw;;left:20vw;bottom:55vh;'>Close</button>";
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
			popup.close();
		});
	}
	close() {
		this.disableMesh.style.zIndex = "10";
		this.dom.style.display = "none";
	}
}
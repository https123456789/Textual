class View {
	constructor(domObj, ddomObj) {
		this.dom = domObj;
		//this.dom.addEventListener("animationend", this.animationEnded(this.dom));
		this.disableMesh = ddomObj;
	}
	animationEnded(dom) {
		var animationType;
		console.log("Dom: " + dom);
		if (this.dom.classList.contains("viewAnimationOpen")) {
			console.log("Open animation ended.");
		}
	}
	playOpenAnimation() {
		this.dom.classList.remove("viewAnimationClose");
		this.dom.classList.add("viewAnimationOpen");
		var children = this.dom.children;
		for (var i = 0; i < children.length; i++) {
			children[i].classList.remove("viewAnimationOpen");
		}
		this.openAnimationEnded();
	}
	openAnimationEnded() {
		this.dom.style.display = "block";
		this.disableMesh.style.display = "block";
	}
	show() {
		this.playOpenAnimation();
	}
	playCloseAnimation() {
		this.dom.classList.remove("viewAnimationOpen");
		this.dom.classList.add("viewAnimationClose");
		var children = this.dom.children;
		for (var i = 0; i < children.length; i++) {
			children[i].classList.remove("viewAnimationClose");
		}
	}
	closeAnimationEnded() {
		this.dom.style.display = "none";
		this.disableMesh.style.display = "none";
	}
	hide(domObj, ddomObj) {
		this.playCloseAnimation();
		this.closeAnimationEnded();
	}
}
class SaveView extends View {
	constructor(domObj, ddomObj, downDomObj) {
		super(domObj, ddomObj);
		this.downloadDom = downDomObj;
	}
	openAnimationEnded() {
		super.openAnimationEnded()
		//editor.save(this.downloadDom);
	}
	show() {
		this.playOpenAnimation();
		this.openAnimationEnded();
	}
}
class SettingsView extends View {
	constructor(domObj, ddomObj) {
		super(domObj, ddomObj);
	}
	show() {
		this.playOpenAnimation();
		settings.getInfo();
		document.getElementById("versionLabel").innerHTML = GLOBAL.VERSION;
		super.openAnimationEnded()
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
	constructor(domObj, disableMeshObj, message, waitForInput=false, inputObjects={}, disableMeshHide=true) {
		this.dom = domObj;
		this.disableMesh = disableMeshObj;
		this.disableMeshHide = disableMeshHide;
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
			document.getElementById("disableInteractionsMesh").style.display = "none";
			document.getElementById("disableInteractionsMesh").style.zIndex = "10";
			document.getElementById("popups").style.display = "none";	
		});
	}
}

/* Animations */

class Animation {
	constructor(durration) {
		this.startTime = Date.now();
		this.currentTime = Date.now();
		this.durration = durration;
	}
	play() {
		
	}
}

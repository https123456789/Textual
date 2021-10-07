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
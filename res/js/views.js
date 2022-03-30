class View {
	constructor(topDom, disableInteractionsMesh) {
		this.topDom = topDom;
		this.disableInteractionsMesh = disableInteractionsMesh;
		this.registedShowEventHooks = [];
		this.registedHideEventHooks = [];
		this.closeKeylistener;
	}
	show() {
		this.disableInteractionsMesh.style.display = "block";
		this.topDom.style.display = "block";
		this.registedShowEventHooks.forEach((item) => {
			item();
		});
		this.closeKeylistener = document.addEventListener("keydown", (event) => {
			if (event.key == "Escape") {
				this.hide();
				document.removeEventListener(this.closeKeyListener);
				editor.domRef.focus();
			}
		});
	}
	hide() {
		this.disableInteractionsMesh.style.display = "none";
		this.topDom.style.display = "none";
		this.registedHideEventHooks.forEach((item) => {
			this.runEventHook(item);
		});
	}
	/* Event hooks */
	registerShowEventHook(callback) {
		this.registedShowEventHooks.push(callback);
	}
	registerHideEventHook(callback) {
		this.registedHideEventHooks.push(callback);
	}
	runEventHook(callback) {
		callback();
	}
}
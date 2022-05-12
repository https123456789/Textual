class ExtrasManager {
	constructor() {
		this.availableExtrasIds = [];
		this.availableExtras = [];
		this.runtimeHelpers = {
			includeInAll: []
		};
		this.libraries = [];
		this.runtimes = [];
		this.dom = document.getElementById("extrasRuntimes");
		this.menuDom = document.getElementById("extras-installed-list");
	}
	init() {
		this.loadAvailableExtras();
		this.updateUI();
	}
	loadAvailableExtras() {
		this.availableExtrasIds = JSON.parse(localStorage.getItem("extrasIdStore"));
		this.loadExtra(0, this.availableExtrasIds[0], this.availableExtrasIds[1]);
	}
	loadExtra(ei, id, next) {
		var nel = document.createElement("script");
		nel.setAttribute("src", "extras/" + id + "/extra.js");
		nel.setAttribute("defer", "defer");
		if (next) {
			nel.setAttribute("onload", `extrasManager.loadExtra(${ei + 1}, ${next}, ${this.availableExtrasIds[ei + 1]})`);
		}
		this.dom.appendChild(nel);
	}
	registerExtra(data) {
		console.log("Registering extra " + data.id + "...");
		if (data.permissions) {
			if (data.permissions.includeInAll && data.permissions.root) {
				this.runtimeHelpers.includeInAll.push(data);
			}
		}
		this.availableExtras.push(data);
		if (data.isLibrary) {
			this.libraries.push(data);
			// Don't create runtime if extra is library.
			console.log("Extra " + data.id + " is a library.");
			this.updateUI();
			return;
		}
		this.createRuntime(data);
		this.updateUI();
	}
	addAvailableExtra(id) {
		this.availableExtrasIds.push(id);
		this.saveExtrasIds();
		this.loadExtra(id);
	}
	saveExtrasIds() {
		localStorage.setItem("extrasIdStore", JSON.stringify(this.availableExtrasIds));
	}
	createRuntime(extra) {
		var newRuntime = new ExtraRuntime(extra, this.runtimeHelpers);
		newRuntime.start();
	}
	updateUI() {
		this.menuDom.innerHTML = "";
		this.availableExtras.forEach((extra) => {
			this.menuDom.innerHTML += `<div><p>${extra.id}</p></div>`;
		});
	}
}

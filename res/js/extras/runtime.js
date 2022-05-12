class ExtraRuntime {
	constructor(extra, helpers = {}) {
		this.extra = extra;
		if (helpers) {
			this.helpers = helpers;
		}
	}
	start() {
		this.iframe = document.createElement("iframe");
		this.iframe.classList.add("extra-runtime");
		this.iframe.src = "about:blank";
		document.body.appendChild(this.iframe);
		console.log("Runtime for " + this.extra.id + " started.");
		this.addDependancies();
		this.addScripts();
	}
	addDependancies() {
		this.addLibraries();
	}
	addLibraries() {
		if (this.helpers.includeInAll) {
			this.helpers.includeInAll.forEach((item) => {
				var nsel = this.iframe.contentWindow.document.createElement("script");
				nsel.src = "extras/" + item.id + "/" + item.libPath;
				this.iframe.contentWindow.document.body.appendChild(nsel);
				console.log("Loaded extra " + this.extra.id + " dependancy library '" + item.package.name + "'.");
			});
		}
	}
	addScripts() {
		this.extra.scripts.forEach((item) => {
			this.addScript(item);
		})
	}
	addScript(script) {
		var sel = this.iframe.contentWindow.document.createElement("script");
		sel.src = "extras/" + this.extra.id + "/" + script.path;
		this.iframe.contentWindow.document.body.appendChild(sel);
	}
}
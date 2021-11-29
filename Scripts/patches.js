function updatePatches() {
	var listDom = document.getElementById("patchesList");
	var patchesReq = new XMLHttpRequest();
	patchesReq.addEventListener("load", function() {
		if (this.status == 200) {
			listDom.innerHTML = "";
			var data = JSON.parse(this.responseText);
			for (var i = 0; i < data["Patches"].length; i++) {
				var patchesInstalledList = JSON.parse(localStorage.getItem("patchesInstalledList"));
				if (patchesInstalledList == null) {
					patchesInstalledList = [];
				} else {
					patchesInstalledList = patchesInstalledList.main;
				}
				if (patchesInstalledList.includes(data["Patches"][i].id)) {
					listDom.innerHTML += `
						<div class="patch row">
							<div class="column">
								<p class="patch-title">${data["Patches"][i]["Name"]}</p>
								<p>${data["Patches"][i]["Details"]}</p>
							</div>
							<div class="column">
								<p class="patch-status">${data["Statuses"][data["Patches"][i]["Status"]]["Value"]}</p>
								<a class="patch-download" role="button" id="patch-download-id-${data["Patches"][i]["id"]}">Installed</a>
								<p>View Raw: <a href="https://textual-pages.https12345678.repl.co/api?m=get&rt=patch&fn=patches.json&pid=${i}">source</a></p>
							</div>
						</div>
					`;
				} else {
					listDom.innerHTML += `
						<div class="patch row">
							<div class="column">
								<p class="patch-title">${data["Patches"][i]["Name"]}</p>
								<p>${data["Patches"][i]["Details"]}</p>
							</div>
							<div class="column">
								<p class="patch-status">${data["Statuses"][data["Patches"][i]["Status"]]["Value"]}</p>
								<a onclick="downloadPatch(${data["Patches"][i]["id"]}, 'patch-download-id-${data["Patches"][i]["id"]}')" download class="patch-download" role="button" id="patch-download-id-${data["Patches"][i]["id"]}">Download</a>
								<p>View Raw: <a href="https://textual-pages.https12345678.repl.co/api?m=get&rt=patch&fn=patches.json&pid=${i}">source</a></p>
							</div>
						</div>
					`;
				}
			}
			console.log("Updated patches list.");
		} else {
			listDom.innerHTML = "<p>An error ocurred while loading patches.</p>";
		}
	});
	patchesReq.open("GET", "https://textual-pages.https12345678.repl.co/api?m=get&rt=patch&fn=patches.json");
	patchesReq.send();
}
function downloadPatch(id, domRef) {
	var domRef = document.getElementById(domRef);
	var dreq = new XMLHttpRequest();
	dreq.addEventListener("load", function() {
		if (this.status == 200) {
			if (!domRef.disabled) {
				domRef.innerHTML = "Downloading...";
				domRef.disabled = true;
				console.log("Downloading...");
				var self = this;
				var data = JSON.parse(self.responseText);
				var d = JSON.parse(localStorage.getItem("patchesToDoStack"));
				d.list.push(data["Content"]["Patch"]);
				localStorage.setItem("patchesToDoStack", JSON.stringify(d));
				var d2 = JSON.parse(localStorage.getItem("patchesInstalledList"));
				if (d2 == null) {
					d2 = {
						main: []
					};
				}
				if (!d2.main.includes(data.id)) {
					d2.main.push(data.id);
				}
				console.log(JSON.stringify(d2));
				localStorage.setItem("patchesInstalledList", JSON.stringify(d2));
				updatePatches();
			}
		} else {
			console.log("Attempt to dowload patch " + id + "failed with a return status of " + this.status + ".");
			domRef.innerHMTL = "Attempt to dowload patch " + id + "failed with a return status of " + this.status + ".";
		}
	});
	dreq.open("GET", "https://textual-pages.https12345678.repl.co/api?m=get&rt=patch&fn=patches.json&pid=" + id);
	dreq.send();
}

function installTD() {
	var data = JSON.parse(localStorage.getItem("patchesToDoStack"));
	if (data == null) {
		data = {
			list: [

			]
		};
	}
	for (var i = 0; i < data.list.length; i++) {
		var revd = data;
		console.log("Installing patch #" + i + "...");
		eval(data.list[i]);
		console.log("Removing patch #" + i + " from stack...");
		revd.list.shift();
		localStorage.setItem("patchesToDoStack", JSON.stringify(revd));
		console.log("Done.");
	}
}

function patchUpdateLoop() {
	updatePatches();
	installTD();
}

window.setInterval(patchUpdateLoop, 60000);
patchUpdateLoop();
function updatePatches() {
	var listDom = document.getElementById("patchesList");
	var patchesReq = new XMLHttpRequest();
	patchesReq.addEventListener("load", function() {
		if (this.status == 200) {
			listDom.innerHTML = "";
			var data = JSON.parse(this.responseText);
			for (var i = 0; i < data["Patches"].length; i++) {
				var patchesInstalledList = JSON.parse(localStorage.getItem("patchesIntalledList") ?? '{"main":[]}').main;
				if (patchesInstalledList.includes(data["Patches"][i]["Name"])) {
					listDom.innerHTML += `
						<div class="patch row">
							<div class="column">
								<p class="patch-title">${data["Patches"][i]["Name"]}</p>
								<p>${data["Patches"][i]["Details"]}</p>
							</div>
							<div class="column">
								<p class="patch-status">${data["Statuses"][data["Patches"][i]["Status"]]["Value"]}</p>
								<a onclick="" download class="patch-download" role="button" disabled>Download</a>
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
								<a onclick="downloadPatch(${data["Patches"][i]["id"]}, document.getElementById("patch-download-id-${data["Patches"][i]["id"]}))" download class="patch-download" role="button" id="patch-download-id-${data["Patches"][i]["id"]}">Download</a>
								<p>View Raw: <a href="https://textual-pages.https12345678.repl.co/api?m=get&rt=patch&fn=patches.json&pid=${i}">source</a></p>
							</div>
						</div>
					`;
				}
			}
		} else {
			listDom.innerHTML = "<p>An error ocurred while loading patches.</p>";
		}
	});
	patchesReq.open("GET", "https://textual-pages.https12345678.repl.co/api?m=get&rt=patch&fn=patches.json");
	patchesReq.send();
}
function downloadPatch(id, domRef) {
	var dreq = new XMLHttpRequest();
	dreq.addEventListener("load", function() {
		if (this.status == 200) {
			domRef.innerHTML = "Downloading...";
		} else {
			console.log("Attempt to dowload patch " + id + "failed with a return status of " + this.status + ".");
			domRef.innerHMTL = "Attempt to dowload patch " + id + "failed with a return status of " + this.status + ".";
		}
	});
	dreq.open("GET", "https://textual-pages.https12345678.repl.co/api?m=get&rt=patch&fn=patches.json&pid=" + id);
	dreq.send();
}

window.setInterval(function() {
	updatePatches();
	console.log("Patches list has been updated.");
}, 60000);

updatePatches();
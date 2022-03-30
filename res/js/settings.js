class SettingsManager {
	constructor() {
		this.updates = {
			status: {
				content: {
					uptodate: `<p>Your up to date :)</p>`,
					updateNeeded: (versionName, downloadLink) => `<div class="center">
						<p>Update available</p>
						<p>${versionName}</p>
						<p>Download <a href="${downloadLink}" target="_blank">here</a>.
						</div>`
				}
			}
		}
	}
	init() {
		this.view = settingsView;
		this.view.registerShowEventHook(this.viewShowed);
		this.checkForUpdate();
		this.updateVersionLabels();
	}
	updateVersionLabels() {
		var els = document.getElementsByClassName("versionLabel");
		for (var i = 0; i < els.length; i++) {
			els[i].innerHTML = GLOBAL.VERSION;
		}
	}
	viewShowed() {
		themeManager.updateThemeSelector();
	}
	checkForUpdate() {
		var updateDom = document.getElementById("updateStatusOutput");
		var versionUrl = "https://textual-db.https12345678.repl.co/textual/latest/version";
		var request = new XMLHttpRequest();
		request.onload = () => {
			if (request.status != 200) {
				// Request failed
				updateDom.innerHTML = `<p>Sorry, something went wrong :(</p>`;
				return;
			}
			var data = JSON.parse(request.responseText);
			var versionVerboseName = `${data.versionIdentifier.versionData.prefix} ${data.versionIdentifier.versionData.top}.${data.versionIdentifier.versionData.sub}`;
			// Check if update is available
			if (data.versionIdentifier.versionData.top <= GLOBAL.VERSION_TOP) {
				if (data.versionIdentifier.versionData.sub <= GLOBAL.VERSION_SUB) {
					// Up to date
					updateDom.innerHTML = this.updates.status.content.uptodate;
				} else {
					// Sub version available
					updateDom.innerHTML = this.updates.status.content.updateNeeded(versionVerboseName, "https://github.com/https123456789/Textual/releases");
				}
			} else {
				// Top version available
				updateDom.innerHTML = this.updates.status.content.updateNeeded(versionVerboseName, "https://github.com/https123456789/Textual/releases");
			}
		}
		request.open("GET", versionUrl);
		request.send();
		return;
	}
}
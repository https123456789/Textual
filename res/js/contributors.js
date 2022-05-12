var contributorsContainerDom = document.getElementById("contributors-container");

function updateContributorsList() {
	// Clear container
	while (contributorsContainerDom.firstChild) {
		contributorsContainerDom.removeChild(
			contributorsContainerDom.lastChild
		);
	}
	// Get contributor data from Github API
	var apiurl = "https://api.github.com/repos/https123456789/Textual/commits?per_page=5";
	var tcr = new XMLHttpRequest();
	tcr.open("GET", apiurl, false);
	tcr.send();
	if (tcr.status != 200) {
		console.log("tcr - " + tcr.status);
		return;
	}
	var pageMax = tcr.getResponseHeader("link");
	if (typeof(pageMax) != "string") {
		return;
	}
	pageMax = pageMax.split(",")[0].split(";")[0].split("&page=").at(-1).split(">")[0];
	pageMax = parseInt(pageMax);
	var tcr2 = new XMLHttpRequest();
	tcr2.open("GET", "https://api.github.com/repos/https123456789/Textual/commits?par_page=5&page=" + pageMax, false);
	tcr2.send();
	if (tcr2.status != 200) {
		console.log("tcr2 - " + tcr2.status);
		return;
	}
	var tcr2d = JSON.parse(tcr2.responseText);
	totalCommits = (5 * pageMax) + tcr2d.length;
	apiurl = "https://api.github.com/repos/https123456789/Textual/contributors";
	var request = new XMLHttpRequest();
	request.open("GET", apiurl, false);
	request.send();
	if (request.status != 200) {
		console.log("request - " + request.status);
		return;
	}
	// Update content in container
	var data = JSON.parse(request.responseText);
	data.forEach((item) => {
		var topEl = document.createElement("div");
		topEl.classList.add("contributor-data-container");
		
		var contributorUserIcon = document.createElement("img");
		contributorUserIcon.src = item.avatar_url;
		contributorUserIcon.classList.add("contributor-data-icon");
		topEl.appendChild(contributorUserIcon);
		
		var contributorUsernameEl = document.createElement("p");
		contributorUsernameEl.innerHTML = item.login;
		contributorUsernameEl.classList.add("contributor-data-username");
		topEl.appendChild(contributorUsernameEl);
		
		var contribsPerc = document.createElement("progress");
		contribsPerc.classList.add("contributor-data-percent");
		contribsPerc.max = 100;
		if (item.contributions == 1) {
			contribsPerc.innerHTML = "1 commit - ";
		} else if (item.contributions == 0) {
			contribsPerc.innerHTML = "no commits - ";
		} else {
			contribsPerc.innerHTML = item.contributions + " commits - ";
		}
		contribsPerc.innerHTML += (Math.floor((item.contributions / totalCommits) * 10000) / 100) + "%";
		contribsPerc.value = Math.floor((item.contributions / totalCommits) * 10000) / 100;
		var intPercent = parseInt(contribsPerc.value);
		var color = "rgba(0, 0, 255, 1)";
		console.log(intPercent);
		if (intPercent >= 0) {
			color = "rgba(255, 0, 0, 1)";
		}
		if (intPercent >= 50) {
			color = "rgba(255, 150, 0, 1)";
		}
		if (intPercent >= 75) {
			color = "rgba(255, 255, 0, 1)";
		}
		if (intPercent >= 80) {
			color = "rgba(0, 255, 0, 1)";
		}
		contribsPerc.style.setProperty("--contributor-progressbar-value-color", color);
		contribsPerc.classList.add("contributor-data-percent-value-anm");
		
		var contribsPercText = document.createElement("p");
		contribsPercText.innerHTML = contribsPerc.innerHTML;
		contribsPercText.classList.add("contributor-data-percent-text");
		topEl.appendChild(contribsPercText);
		topEl.appendChild(contribsPerc);
		contributorsContainerDom.appendChild(topEl);
	});
}
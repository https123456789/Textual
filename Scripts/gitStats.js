function getContribsFor(username, callback) {
	var ret = {

	}
	var branches = {
		"count": 0,
		"shas": [

		]
	}
	checkIfGAPICallsExist(function(useCached) {
		console.log(useCached);
		if (useCached) {
			var req = new XMLHttpRequest();
			req.addEventListener("load", function() {
				if (this.status == 200) {
					var authorCount = 0;
					var json = JSON.parse(this.responseText);
					for (var i = 0; i < json.length; i++) {
						if (json[i]["author"]["login"] == username) {
							authorCount += 1;
						}
					}
					ret.count = authorCount;
					ret.percent = Math.round((ret.count / json.length) * 100) / 100;
					callback(ret);
				}
			});
			req.open("GET", "https://api.github.com/repos/https123456789/Textual/commits?type=all");
			req.send();
		} else {
			// Use Cached API Data
			console.warn("Using cached Github API data.");
			var cachedAPIData = JSON.parse(localStorage.getItem("GithubAPIData"));
			ret.count = cachedAPIData["Contributors"][username]["count"];
			ret.percent = Math.round((ret.count / cachedAPIData["Contributors-Overall"]["Total-Commits"]) * 100) / 100;
			callback(ret);
		}
	});
}
function checkIfGAPICallsExist(callback) {
	var res = new XMLHttpRequest();
	res.addEventListener("load", function() {
		if (this.status == 200) {
			var d = JSON.parse(this.responseText);
			console.log(d.resources.core.remaining);
			if (d.resources.core.remaining != 0) {
				console.log(true);
				callback(true);
			} else {
				console.log(false);
				callback(false);
			}
		} else {
			callback(false);
		}
	});
	res.open("GET", "https://api.github.com/rate_limit", false);
	res.send();
}
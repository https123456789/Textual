function getContribsFor(username, callback) {
	var ret = {

	}
	checkIfGAPICallsExist(function(useCached) {
		console.log(useCached);
		if (useCached) {
			var req = new XMLHttpRequest();
			req.addEventListener("load", function() {
				if (this.status == 200) {
					var res = JSON.parse(this.responseText);
					var numberOfCommiters = res.length;
					var totalCommits = 0;
					console.log(numberOfCommiters);
					for (var i = 0; i < numberOfCommiters; i++) {
						if (res[i].author.login == username) {
							ret.count = res[i].total;
						}
						totalCommits += res[i].total;
					}
					var percent = Math.round((ret.count / totalCommits) * 1000) / 1000;
					console.log(res.percent);
					ret.percent = Math.round((percent * 100) * 1000) / 1000;
					callback(ret);
				}
			});
			req.open("GET", "https://api.github.com/repos/https123456789/Textual/stats/contributors");
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
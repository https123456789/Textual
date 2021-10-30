function getContribsFor(username, callback) {
	var ret = {

	}
	var branches = {
		"count": 0,
		"shas": [

		]
	}	
	if (checkIfGAPICallsExist()) {
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
		req.open("GET", "https://api.github.com/repos/https123456789/Textual/commits");
		req.send();
	} else {
		// Use Cached API Data
		var cachedAPIData = JSON.parse(localStorage.getItem("GithubAPIData"));
		ret.count = cachedAPIData["Contributors"][username]["count"];
		ret.percent = Math.round((ret.count / cachedAPIData["Contributors-Overall"]["Total-Commits"]) * 100) / 100;
		callback(ret);
	}
}
/*{"Contributors":{"https123456789":{"count":29},"LGgameLAB":{"count":1}},"Contributors-Overall": {"Total-Commits": 30}}*/
function checkIfGAPICallsExist() {
	var res = new XMLHttpRequest();
	res.addEventListener("load", function() {
		if (this.status == 200) {
			return false;
		} else {
			return false;
		}
	});
	res.open("GET", "https://api.github.com/rate_limit", false);
	res.send();
}
var console = {
	log: function() {
		for (var i = 0; i < arguments.length; i++) {
			this.stdout(arguments[i]);
		}
	},
	error: function() {
		
	},
	info: function() {
		
	},
	warn: function() {
		
	},
	stdout: function(message) {
		window.parent.postMessage(JSON.stringify({
			source: "extra",
			sln: "stdlib",
			type: "console-msg",
			payload: message
		}), "*");
		//window.parent.document.getElementById("extras-console-display").innerHTML += `<div>${message}</div>`;
	}
}
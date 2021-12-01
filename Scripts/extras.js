var extras = {
	register: function(obj) {
		console.log("Registering extra '" + obj.name + "' with id of '" + obj.id + "', type: '" + obj.constructor.name + "'.");
		// Add to stack
		var data = JSON.parse(localStorage.getItem("extrasStack"));
		if (data == null) {
			data = {
				stack: {

				}
			};
		}
		data.stack[obj.id] = obj;
		localStorage.setItem("extrasStack", JSON.stringify(data));
	},
	publish: function(obj) {
		var type = obj.constructor.name;
		var acceptedList = [
			"BasicPublicObject"
		];
		if (acceptedList.includes(type)) {
			console.log("Publishing '" + obj.name + "' with id '" + obj.id + "'.");
			if (!extras.public[obj.id]) {
				extras.public[obj.id] = {};
			}
			extras.public[obj.id][obj.name] = obj;
		} else {
			console.log("Failed attempt to publish a not public extra object.");
		}
	},
	lookup: function(id) {
		var data = JSON.parse(localStorage.getItem("extrasStack"));
		if (data == null) {
			data = {
				stack: {

				}
			};
		}
		if (data.stack[id]) {
			return data.stack[id];
		} else {
			return 1;
		}
	},
	public: {

	},
	BasicObject: class {
		constructor(constructObj) {
			var keys = Object.keys(constructObj);
			for (var i = 0; i < keys.length; i++) {
				this[keys[i]] = constructObj[keys[i]];
			}
		}
	},
	BasicPublicObject: class {
		constructor(constructObj) {
			var constructObj = constructObj;
			var keys = Object.keys(constructObj);
			for (var i = 0; i < keys.length; i++) {
				this[keys[i]] = constructObj[keys[i]];
			}
		}
	}
};

function loadExtras() {
	console.log("Loading extras...");
	var data = JSON.parse(localStorage.getItem("extrasList"));
	if (data == null) {
		data = {
			list: [

			]
		};
	}
	var divDom = document.getElementById("extrasLoadingArea");
	for (var i = 0; i < data.list.length; i++) {
		var el = document.createElement("script");
		el.src = "Extras/" + i + "/index.js";
		divDom.appendChild(el);
	}
	console.log("Extras loaded.");
}

function updateExtrasView() {
	var mdomRef = document.getElementById("extras-marketplace-container");
	var idomRef = document.getElementById("extras-installed-list");
	var elist = JSON.parse(localStorage.getItem("extrasList"));
	if (elist == null) {
		elist = {
			list: [
				"0",
				"1"
			]
		};
	}
	var content = "";
	for (var i = 0; i < elist.list.length; i++) {
		var extra = extras.lookup(elist.list[i]);
		content += `
			<div class="extra-list-item row">
				<div class="column">
					<h3>${extra.name}</h3>
					<p>${extra.description}</p>
				</div>
				<div class="column">
					<h4>Permissions</h4>
				</div>
			</div>
		`;
	}
	idomRef.innerHTML = content;
}

function extrasUpdateLoop() {
	updateExtrasView();
}

window.setInterval(extrasUpdateLoop, 60000);

loadExtras();
extrasUpdateLoop();
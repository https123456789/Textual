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
	BasicObject: class {
		constructor(constructObj) {
			this.name = constructObj.name;
			this.id = constructObj.id;
			this.dependList = constructObj.dependList;
		}
	},
	BasicPublicObject: class {
		constructor(constructObj) {
			this.constructObj = constructObj;
			this.pid = constructObj.id;
			this.name = constructObj.name;
			this.id = constructObj.id;
			this.dependList = constructObj.dependList;
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
	for (var i = 0; i < elist.list.length; i++) {
		console.log(elist.list[i]);
		var extra = extras.lookup(elist.list[i]);
		idomRef.innerHTML += `
			<div class="extra-list-item">
				<h3 style="border-bottom: 1px solid rgb(0, 0, 0);">${extra.name}</h3>
			</div>
		`;
	}
}

function extrasUpdateLoop() {
	updateExtrasView();
}

window.setInterval(extrasUpdateLoop, 60000);

loadExtras();
extrasUpdateLoop();
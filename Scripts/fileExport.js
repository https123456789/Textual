class Exporter {
	constructor(f) {
		this.fileName = f.name;
		this.fileExtension = f.extension;
	}
	convertFromRawHTML(content, ops) {
		var formattedContent = content;
		// Create real symbols
		formattedContent = formattedContent.replaceAll("&lt;", "<");
		formattedContent = formattedContent.replaceAll("&gt;", ">");
		if (ops["remove-div"]) {
			formattedContent = formattedContent.replaceAll("<div>", "");
			formattedContent = formattedContent.replaceAll("</div>", "");
		}
		if (ops["remove-br"]) {
			formattedContent = formattedContent.replaceAll("<br>", "");
		}
		console.log(formattedContent);
		return formattedContent;
	}
}
class PlainTextExporter extends Exporter {
	// Exports into a plain text file.
	constructor(f, content) {
		super(f);
		this.content = content;
	}
	exportToFile() {
		var formattedContent = this.convertFromRawHTML(this.content, {
			"remove-div": true,
			"remove-br": true
		});
		var blob = new Blob([
			formattedContent
		], {
			type: "text/plain"
		});
		var link = document.createElement("a");
		link.download = this.fileName + "." + this.fileExtension;
		link.href = window.URL.createObjectURL(blob);
		link.click();
	}
}
class HTMLExporter extends Exporter {
	// Exports into a HTML file.
	constructor(f, content) {
		super(f);
		this.content = content;
	}
	exportToFile() {
		var formattedContent = this.convertFromRawHTML(this.content, {
			"remove-div": true,
			"remove-br": true
		});
		var blob = new Blob([
			formattedContent
		], {
			type: "text/html"
		});
		var link = document.createElement("a");
		link.download = this.fileName + "." + this.fileExtension;
		link.href = window.URL.createObjectURL(blob);
		link.click();
	}
}
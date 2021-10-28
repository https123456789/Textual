export const name = "export";

class Export {
	constructor(f) {
		this.fileName = f.name;
		this.fileExtension = f.extenstion;
	}
}
class PlainTextExport(Export) {
	
}

export function exportPlainText() {
	
}

export {
	name
}
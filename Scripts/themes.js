class Theme {
	constructor() {
		this.menuColor;
		this.menuColorHover;
		this.textEditorColor;
		this.menusColor;
	}
	updateUI() {
		
	}
}
class LightTheme extends Theme {
	constructor() {
		super();
		this.menuColor = 0x969696;
		this.menuColorHover = 0x646464;
		this.textEditorColor = 0xc8c8c8;
		this.menusColor = 0xffffff;
	}
}
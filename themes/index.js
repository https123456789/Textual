themeManager.registerThemes({
	optGroups: [
		{
			name: "std",
			fullName: "Default",
			forceIndex: true,
			index: 0
		},
		{
			name: "colors",
			fullName: "Colors",
			forceIndex: false
		},
		{
			name: "dev",
			fullName: "Developers",
			forceIndex: true,
			index: -1
		}
	],
	themes: [
		{
			name: "Light",
			filePath: "Light.css",
			optGroup: {
				name: "std"
			}
		},
		{
			name: "Dark",
			filePath: "Dark.css",
			optGroup: {
				name: "std"
			}
		},
		{
			name: "Developer / Testing",
			filePath: "dev/main.css",
			optGroup: {
				name: "dev"
			}
		},
		{
			name: "Green",
			filePath: "colors/green.css",
			optGroup: {
				name: "colors"
			}
		},
		{
			name: "Blue",
			filePath: "colors/blue.css",
			optGroup: {
				name: "colors"
			}
		}
	]
});
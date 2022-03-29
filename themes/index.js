themeManager.registerThemes({
	optGroups: [
		{
			name: "std",
			fullName: "Default",
			forceIndex: true,
			index: 0
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
		}
	]
});
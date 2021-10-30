# Making a Theme

## Making the CSS file

Remember to follow the rules in */Rules*!

### Rule Order

1. The `:root` selector is always the first rule.
2. The rules that follow `:root` are defined in [/Rules/CSSRULES.md](<../Rules/CSSRULES.md>).
3. All other adiotional rules should be defined at the bottom of the file.

Your file should now look like:
```
:root {
	--name: Your Theme Name
}

/* Other CSS Rules */

#themeSample {
	filter: invert(74%) sepia(17%) saturate(6358%) hue-rotate(164deg) brightness(100%) contrast(103%);
}
```
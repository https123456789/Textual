# Extras Notes

## Runtime

Extras will run in an iframe and should only interact with the parent window through `postMessage`.

## Loading

Extras will be loaded in a chained fasion:
```javascript
var stack = [0, 1, 2, 3, 4];
```
Loading is started with a single call:
```javascript
load(stack[0], stack[1]);
```
When the script loads, the onload attribute fires the loading of the next script.

This ensures that the scripts load in order.
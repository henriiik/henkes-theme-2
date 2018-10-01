import { readFileSync, writeFileSync, unlinkSync } from "fs";

const files = ["dark_defaults.json", "dark_plus.json", "dark_vs.json"];
const cyan = "#33ddff";
const lightblue = "#33bbff";
const pink = "#ff66b3";
const darkblue = "#668cff";
const purple = "#df80ff";
const yellow = "#fff599";
const green = "#99ff99";
const gray = "#808080";
const white = "#ffffff";

const conversions = [
	["dark_defaults.json", "henke_defaults.json"],
	["dark_plus.json", "henke_plus.json"],
	["dark_vs.json", "henke_vs.json"],
	["#DCDCAA", cyan], // function name
	["#4EC9B0", lightblue], // type/class name
	["#C586C0", pink], // control (return, if, await, import, export)
	["#9CDCFE", darkblue], // variable/property name
	["#569cd6", purple], // storage (const, class, function, extends, new, tsx)
	["#ce9178", yellow], // strings
	["#b5cea8", green], // numeric constant
	["#6A9955", gray], // comments
	["#d4d4d4", white], // text
];

const extra = {
	$schema: "vscode://schemas/color-theme",
	name: "Henke's Theme 2",
	include: "./henke_plus.json",
	tokenColors: [
		{
			name: "tsx/jsx brackets",
			scope: ["punctuation.section.embedded"],
			settings: {
				foreground: white,
			},
		},
	],
};

files.map(file => {
	const path = "./themes/" + file;

	let text = readFileSync(path).toString();
	for (const [a, b] of conversions) {
		text = text.replace(new RegExp(a, "ig"), b);
	}

	const newPath = path.replace("dark", "henke");
	try {
		unlinkSync(newPath);
	} catch (e) {}
	writeFileSync(newPath, text);
});

const extraPath = "./themes/henke.json";
try {
	unlinkSync(extraPath);
} catch (e) {}
writeFileSync(extraPath, JSON.stringify(extra));

console.log("done!");

"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var files = ["dark_defaults.json", "dark_plus.json", "dark_vs.json"];
var cyan = "#33ddff";
var lightblue = "#33bbff";
var pink = "#ff66b3";
var darkblue = "#668cff";
var purple = "#df80ff";
var yellow = "#fff599";
var green = "#99ff99";
var gray = "#808080";
var white = "#ffffff";
var conversions = [
    ["dark_defaults.json", "henke_defaults.json"],
    ["dark_plus.json", "henke_plus.json"],
    ["dark_vs.json", "henke_vs.json"],
    ["#DCDCAA", cyan],
    ["#4EC9B0", lightblue],
    ["#C586C0", pink],
    ["#9CDCFE", darkblue],
    ["#569cd6", purple],
    ["#ce9178", yellow],
    ["#b5cea8", green],
    ["#6A9955", gray],
    ["#d4d4d4", white],
];
var extra = {
    $schema: "vscode://schemas/color-theme",
    name: "Henke's Theme 2",
    include: "./henke_plus.json",
    tokenColors: [
        {
            name: "tsx/jsx brackets",
            scope: ["punctuation.section.embedded"],
            settings: {
                foreground: white
            }
        },
    ]
};
files.map(function (file) {
    var path = "./themes/" + file;
    var text = fs_1.readFileSync(path).toString();
    for (var _i = 0, conversions_1 = conversions; _i < conversions_1.length; _i++) {
        var _a = conversions_1[_i], a = _a[0], b = _a[1];
        text = text.replace(new RegExp(a, "ig"), b);
    }
    var newPath = path.replace("dark", "henke");
    try {
        fs_1.unlinkSync(newPath);
    }
    catch (e) { }
    fs_1.writeFileSync(newPath, text);
});
var extraPath = "./themes/henke.json";
try {
    fs_1.unlinkSync(extraPath);
}
catch (e) { }
fs_1.writeFileSync(extraPath, JSON.stringify(extra));
console.log("done!");

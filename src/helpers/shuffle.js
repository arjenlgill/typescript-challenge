"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shuffle(arr) {
    var i = arr.length;
    var j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
}
exports.default = shuffle;
// taken from https://stackoverflow.com/questions/59810241/how-to-fisher-yates-shuffle-a-javascript-array#answer-59837259, but added my own typing

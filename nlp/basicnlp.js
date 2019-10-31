const natural  = require('natural');

const nounInflector = new natural.NounInflector();

console.log(nounInflector.pluralize("APPLE"));
console.log(nounInflector.pluralize("Fruit"));

let string1 = "ninjaa team1 is working on autoated incident resolution"

let string2 = "ninjaa team2 is working on chat bot"

let string3 = "Gitesh Bakshi is managing Team 1 and 2"

let string4 = "Rajan S.P.  is managing Team 3 and 4"

console.log(natural.JaroWinklerDistance(string1,string2))
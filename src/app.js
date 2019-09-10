import Decipher from "./components/Decipher";
import Parser from "./components/Parser";

let ex = new Decipher("7E A0 21 03 00 02 50 83 73 67 53 81 80 12 05 01 80 06 01 80 07 04 00 00 00 01 08 04 00 00 00 01 53 3B 7E");

console.log(ex.binary);

let p = new Parser(ex.binary);

console.log(p.parse());

let parsedRes = p.parse();

let k = p.logRes(parsedRes);

console.log(k);
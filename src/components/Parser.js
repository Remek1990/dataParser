class Parser {

	// let defaultFormat = {"delimiter": 1, "format": 2, "sender": 4, "server": 4, "hChechSeq": 2, "cField": 2, "info": 1, "fCheckSeq": 2, "delimiter": 1}

	getFormat() {
		return {
			defaultFormat: ["del", "format", "sender", "server", "hCheckSeq", "cField", "info", "frCheckSeq", "del"]
		}
	}

	constructor(convertedData, format = this.getFormat().defaultFormat, delLength = 1, formatLength = 2, senderLength = 4, serverLength = 4, hCheckSeqLength = 2, cFieldLength = 1, frCheckSeqLength = 2 ) {
		this.convertedData = convertedData;
		this.format = format;
		this.delLength = delLength;
		this.formatLength = formatLength;
		this.senderLength = senderLength;
		this.serverLength = serverLength;
		this.hCheckSeqLength = hCheckSeqLength;
		this.cFieldLength = cFieldLength;
		this.frCheckSeqLength = frCheckSeqLength;
	}

    static binToHex(arg) {
		return parseInt(arg, 2).toString(16).toUpperCase();
	}
	
	getLength(data) {
		let counter = 0;
		for(let i of data) {
			if(i[7] !== "1") {
				counter++;
			} else {
				counter++;
				break;
			}
		}
		return counter;
	}

    parse() {
		let res = {};
		let cData = this.convertedData.slice(0);
		let parsed = false;
		for(let elem of this.format) {
			if(elem == "sender" || elem == "server") {
				res[elem] = cData.splice(0, this.getLength(cData));
			}else if(elem == "info") {
				continue;
			}else if(parsed && elem == "del") {
				res[elem + "End"] = cData.splice(cData.length - this.delLength, 1);
			} else if(elem == "frCheckSeq") {
				res[elem] = cData.splice(cData.length - (this.delLength + this.frCheckSeqLength), this.frCheckSeqLength);
			}else {
				res[elem] = cData.splice(0, this[elem + "Length"]);
			}
			parsed = true;
		}
		res["info"] = cData;
		
		return res;
	}

	turnToHex(binArr) {
		return binArr.map(e => {
			let el = parseInt(e, 2).toString(16).toUpperCase();
			if(el.length < 2) {
				el = "0" + el;
			}
			return el;
		});
		
	}
	
	logRes(data) {

		let res = "";

		for(let f of this.format) {
			res += `${this.turnToHex(data[f]).join("")} - ${f} \n`
		}

		return res;
		
	}
}

export default Parser;
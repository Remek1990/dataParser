class Decipher {

	constructor(inputData) {

		this.inputData = inputData;

	}

	static hex2bin(hex) {

		let result = [];

		function aux(str) {
			return ("00000000" + (parseInt(str, 16)).toString(2)).substr(-8);
		}

		hex.split(" ").forEach(str => {
			result.push(aux(str));
		});

		return result;

	}

	get binary() {
		return Decipher.hex2bin(this.inputData);
	}
}

export default Decipher;
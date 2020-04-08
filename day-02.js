const inputs = [1, 12, 2, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 6, 1, 19, 1, 5, 19, 23, 1, 13, 23, 27, 1, 6, 27, 31, 2, 31, 13, 35, 1, 9, 35, 39, 2, 39, 13, 43, 1, 43, 10, 47, 1, 47, 13, 51, 2, 13, 51, 55, 1, 55, 9, 59, 1, 59, 5, 63, 1, 6, 63, 67, 1, 13, 67, 71, 2, 71, 10, 75, 1, 6, 75, 79, 1, 79, 10, 83, 1, 5, 83, 87, 2, 10, 87, 91, 1, 6, 91, 95, 1, 9, 95, 99, 1, 99, 9, 103, 2, 103, 10, 107, 1, 5, 107, 111, 1, 9, 111, 115, 2, 13, 115, 119, 1, 119, 10, 123, 1, 123, 10, 127, 2, 127, 10, 131, 1, 5, 131, 135, 1, 10, 135, 139, 1, 139, 2, 143, 1, 6, 143, 0, 99, 2, 14, 0, 0];

const chunk = (array, size) => {
	if (!array) return [];

	const firstChunk = array.slice(0, size); // create the first chunk of the given array

	if (!firstChunk.length) {
		return array; // this is the base case to terminal the recursive
	}

	return [firstChunk].concat(chunk(array.slice(size, array.length), size));
};

const opcodes = new Map([
	[1, (array, inputIndex1, inputIndex2, outputIndex) => { array[outputIndex] = array[inputIndex1] + array[inputIndex2]; }],
	[2, (array, inputIndex1, inputIndex2, outputIndex) => { array[outputIndex] = array[inputIndex1] * array[inputIndex2]; }],
	[99, () => console.log('STOP')]
]);

const operations = chunk(inputs, 4);

function thing(arr) {
	const clonedInputs = arr.slice();

	for (const operation of operations) {
		const [opcode, inputIndex1, inputIndex2, outputIndex] = operation;
		const opcodeFunction = opcodes.get(opcode);

		opcodeFunction(clonedInputs, inputIndex1, inputIndex2, outputIndex);

		if (opcode === 99) { break; }
	}

	return clonedInputs;
}

const targetNumber = 19690720;
let found = false;

for (let noun = 0; noun < 100; noun += 1) {
	for (let verb = 0; verb < 100; verb += 1) {
		const newArray = inputs.slice();

		newArray[1] = noun;
		newArray[2] = verb;

		const result = thing(newArray);

		if (result[0] === targetNumber) {
			console.log('noun:', noun);
			console.log('verb:', verb);
			found = true;
			break;
		}
	}
	if (found) { break; }
}

console.log('done');

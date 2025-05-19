import promptSync from 'prompt-sync';
const prompt = promptSync();

function findIndexes({ numbers, target }) {
    const map = new Map();
    for (let i = 0; i < numbers.length; i++) {
        const complement = target - numbers[i];
        if (map.has(complement)) {
            return { indexes: [map.get(complement), i] };
        }
        map.set(numbers[i], i);
    }
    return { indexes: null };
}

const inputNumbers = prompt("Ingresa una lista de números separados por coma (ej: 1,5,3,9): ");
const inputTarget = prompt("Ingresa el número objetivo (target): ");

const data = {
    numbers: inputNumbers.split(',').map(n => parseInt(n.trim())),
    target: parseInt(inputTarget)
};

const finalOutput = findIndexes(data);
console.log("Resultado:", finalOutput);
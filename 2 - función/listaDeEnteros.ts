interface Input {
    numbers: number[];
    target: number;
}

interface Output {
    indexes: [number, number] | null;
}

function findIndexes({ numbers, target }: Input): Output {
    const map = new Map<number, number>();

    for (let i = 0; i < numbers.length; i++) {
        const complement = target - numbers[i];

        if (map.has(complement)) {
            return { indexes: [map.get(complement)!, i] };
        }

        map.set(numbers[i], i);
    }

    return { indexes: null };
}

const data: Input = { numbers: [1, 5, 3, 9], target: 8 };
const finalOutput = findIndexes(data);
console.log(finalOutput); 

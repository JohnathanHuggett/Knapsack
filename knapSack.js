const { items, capacity } = require("./fileReader");

// function that calculates relative value ratios
function createRatio(arr) {
    let ratioArr = [];

    items.forEach(obj => {
        ratioArr[obj.index] = { ...obj, ratio: obj.size / obj.value };
    });

    ratioArr.shift();

    return sortByRatio(ratioArr);
}

// function that sorts arr of obj's by relative value ratios
function sortByRatio(arr) {
    const sortedArr = arr.slice(0);

    sortedArr.sort((a, b) => {
        return a.ratio - b.ratio;
    });
    return sortedArr;
}

function knappSack(arr, capacity) {
    const sortedArr = createRatio(arr);

    const initKnappSack = {
        itemsSelected: [],
        totalCost: 0,
        totalValue: 0,
    };

    let filledKnapSack = {};

    let sackCapacity = Number(capacity);
    let value = 0;

    while (sackCapacity >= 0) {
        for (let obj of sortedArr) {
            if (sackCapacity - obj.size > 0) {
                sackCapacity -= obj.size;
                value += obj.value;
                initKnappSack.itemsSelected.push(obj.index);
                filledKnapSack = { ...initKnappSack, totalCost: capacity - sackCapacity, totalValue: value };
            }
        }
        return filledKnapSack;
    }
}

console.log(knappSack(items, capacity));

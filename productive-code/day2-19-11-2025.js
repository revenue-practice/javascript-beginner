console.log(typeof 10); // number
console.log(typeof "Ankit"); // string
console.log(typeof true); // boolean
console.log(typeof null); // null
console.log(typeof undefined); // object
console.log(typeof {name: "Ankit"}); // object
console.log(typeof ["name", "Ankit"]); // object [Array --> object]

console.log(5 ** 3); // 125
console.log(5 % 2); // 1

const fName = "Ankit";
console.log(`${fName} is idiot`);

if("") console.log("A"); // falsy-value
else if(0) console.log("A"); // falsy-value
else if(null) console.log("A"); // falsy-value
else if(undefined) console.log("A"); // falsy-value
else if(NaN) console.log("A"); // falsy-value
else if(false) console.log("A"); // falsy-value
else console.log("B");

function greet() {
    console.log(`My name is ${fName}`);
}

greet();

function sum(a, b) {
    return a + b;
}
console.log(sum(2, 3));

const fruits = ["oranges"];
console.log(fruits.length);

fruits.push("guava");

const user = {
    name: "Ankit",
    age: 23, 
    sex: "Male",
    status: "Single"
};

function sumUptoN(n) {
    if(!n) return 0;
    return sumUptoN(n - 1) + n;
}

console.log(sumUptoN(5));

const cities = ["Delhi", "Kolkata", "Mumbai", "Chennai"];
console.log(cities[0]);
console.log(cities[cities.length - 1]);

// Arrow functions

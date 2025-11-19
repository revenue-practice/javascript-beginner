// var, let and const
let x = 5, y = 6, z = 9;
const a = 4, b = 5, c = 6;

// data types --> string, number, boolean, null, undefined, object, array
let name = "Ankit";
let val = 54;
let isFlag = false;
let isNull = null;
let undefinedX;
let classX = {
    fName: "Ankit",
    lName: "Anand",
    age: 23
};
let fruits = ["orange", "apple", "kiwi"];

console.log(5 !== "5");

let age = 20;
if(age >= 18) console.log("Adult");
else console.log("Minor");

// For Loop variation 1
for(let index = 1; index <= 5; index += 1) {
    console.log(index);
}

// For Loop variation 2
const evenNumbers = [2, 4, 6, 8, 10];
for(let evenNum of evenNumbers) {
    console.log(evenNum);
}
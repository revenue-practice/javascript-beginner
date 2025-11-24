function add(a, b) {
    return a + b;
}

const sum = (a, b) => a + b;
const sub = (a, b) => {
    return a - b;
}

const users = [
    { id: 1, name: "Ankit", age: 23, salary: 3000 },
    { id: 2, name: "John", age: 17, salary: 0 },
    { id: 3, name: "Maria", age: 28, salary: 6000 },
    { id: 4, name: "Sam", age: 19, salary: 4000 },
];

// map prooperty
const userNames = users.map(user => user.name);
console.log(userNames); // [ 'Ankit', 'John', 'Maria', 'Sam' ]

const updatedWithBonus = users.map(user => ({
    ...user,
    salary: user.salary * 1.10
}));
console.log(updatedWithBonus);

const updatedWithBonusV1 = users.map(user => {
    const updated = {...user};
    updated.salary = updated.salary * 1.10;

    return updated;
});
console.log(updatedWithBonusV1);

const updateAge = users.map((user) => ({
    ...user,
    age: 22
}));
console.log(updateAge);

console.log(`Typeof updatedWithBonus: ${typeof updatedWithBonus}`); // object [array --> object]
console.log(`Typeof updatedWithBonusV1: ${typeof updatedWithBonusV1}`); // object [array --> object]

if(updatedWithBonus == updatedWithBonusV1) console.log("same"); 
else console.log("Not same"); // not same as in case of array,object reference is checked in equality not values

const adults = users.filter(user => user.age >= 18);
console.log(adults); // [ 'Ankit', 'Maria', 'Sam' ]

const sumOfAge = users.reduce((sum, user) => {
    return sum + user.age;
}, 0);
console.log(sumOfAge); // 23 + 17 + 28 + 19

const valArr = [10, 20, 30, 40, 50];
const [first, second, third, , fifth] = valArr;

console.log(first, second, third, fifth);

const personalInfo = {
    name: "Ankit",
    age: 23, 
    sex: "Male",
    status: "Single",
    salary: 50000,
    deductions: 5000,
    isTaxEligible: false,
};

const { name: fName, age, salary: ctcComponent } = personalInfo;
console.log(fName, age, ctcComponent);

const printUser = ({name: fName, age: currentAge}) => {
    console.log(`Name is ${fName}, and age is ${age}`);
};
printUser(personalInfo);

// spread operators 
const vegetables = ["lettuce", "onion", "carrot"];
const veggies = [...vegetables]; // copy array vegetables

console.log(`Vegetables: ${vegetables}`);
console.log(veggies);

const quickCommerce = ["blinkit", "zepto", "big basket"];
const eCommerce = ["amazon", "flipkart"];

const commerce = [...quickCommerce, ...eCommerce]; // merge array
const updatedQuickCommerce = [...quickCommerce, "dunzo"];

console.log(commerce);
console.log(updatedQuickCommerce);

const vegItem = {
    name: "panner",
    protein: 18,
    quantity: 100,
    weightUnit: "g"
};
const updatedVegItem = {...vegItem}; // copy object
console.log(updatedVegItem);

const nonVeg = {
    name: "chicken breast",
    protein: 31,
    quantity: 100,
    weightUnit: "g",
    calorieProfile: {
        source: "lean",
        calories: 165,
        weightUnit: "kg"
    }
};

const updatedNonVegItem = {
    ...nonVeg,
    calorieProfile: {
        ...nonVeg.calorieProfile,
        weightUnit: "g"
    }
}; // updated immutable object

console.log(nonVeg);
console.log(updatedNonVegItem);


const userList = [
    { name: "Ankit", age: 23 },
    { name: "Maria", age: 22 },
    { name: "Mary", age: 17 }
];

const userListNames = userList.map((user) => {
    return user.name;
});
console.log(userListNames);

const userAdults = userList.filter((user) => {
    return user.age >= 18;
});
console.log(userAdults);

const userAge = userList.reduce((sum, user) => {
    return sum + user.age;
}, 0);
console.log(userAge);

const product = {
    title: "Laptop",
    price: 50000,
    brand: "Apple"
};
const { title: productType, brand } = product;
console.log(productType, brand); // object destructuring


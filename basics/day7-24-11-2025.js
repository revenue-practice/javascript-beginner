/* 
    * Event Loop
*/

const fName = 'Ankit';
console.log('start');
setTimeout(() => {
    console.log(`Hi my name is ${fName}`)
}, 1000);
console.log('end');

/* 
    * Callback --> A function passed as an argument to another function
*/
function downloadFile(data, callback) {
    console.log(`File started downloading`);
    setTimeout(() => {
        callback(data);
        console.log('Timer completed');
    }, 2000);
}

downloadFile('File downloaded', (data) => {
    console.log(data);
});

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const flag = true;

        if (flag) {
            resolve('Task completed');
        }
        else {
            reject('Task rejected');
        }
    }, 3000);
});

myPromise
    .then((value) => console.log(value))
    .catch((error) => console.log(error));


/* 
    * Async function returns a promise and await resolves in order
*/

const fakeAPI = () => {
    setTimeout(() => {
        console.log(`Fake api`);
    }, 5000);
}

async function getUserData() {
    const waitT1 = await fakeAPI();
}
getUserData();

/* 
    * Using async await
*/ 
function getUserFromDB(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: id,
                fName: "Ankit",
                lName: "Anand"
            })
        }, 7000);
    });
}

function getProductData(pId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                pId: pId,
                pName: "Laptop",
                manufacturer: "Apple"
            })
        }, 7000);
    });
}

async function getUserData(id) {
    try {
        const data = await getUserFromDB(id);
        console.log(data);
    }
    catch(error) {
        console.log(error);
    }
}
getUserData(1);

async function getUser(id, pId) {
    try {
        const userData = await Promise.all([getUserFromDB(id), getProductData(pId)]);
        console.log(userData);
    }
    catch (error) { 
        console.log(error);
    }
}
getUser(2, 3);


/* 
console.log(1);
setTimeout(() => console.log(2), 100);
setTimeout(() => console.log(3), 0);
Promise.resolve().then(() => console.log(4));
console.log(5);

* 1 5 4 3 2 [Promise executes first than setTimeout]
*/
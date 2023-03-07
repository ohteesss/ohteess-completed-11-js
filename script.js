'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (movement, i) {
    const depOrWith = movement > 0 ? 'deposit' : 'withdrawal';
    const html = ` 
    <div class="movements__row">
       <div class="movements__type movements__type--${depOrWith}">${
      i + 1
    } ${depOrWith}</div>
       <div class="movements__value">${movement}</div>
     </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);
console.log(containerMovements.innerHTML);

const user = 'Steven Thomas Williams';
// const userName = user
//   .split(' ')
//   .map(name => name[0].toLowerCase())
//   .join('');
// console.log(userName);
// accounts.forEach(account => {
//   compUsername(account);
// });
const createUsername = function (accs) {
  accs.forEach(account => {
    account.userName = account.owner
      .split(' ')
      .map(name => name[0].toLowerCase())
      .join('');
  });
};
createUsername(accounts);
console.log(account1);
// console.log(useAcct1);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];
// // SLICE
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2)); // 'd','e'
// console.log(arr.slice(-1)); // 'e'
// console.log(arr.slice(1, -2)); // 'b', 'c'
// // Shallow Copy Arrays

// console.log(arr.slice());
// console.log([...arr]);

// // SPLICE It mutates the original array
// // console.log(arr.splice(2));
// arr.splice(-1);
// // arr.pop();
// console.log(arr);
// arr.splice(1, 2);
// console.log(arr);

// // REVERSE mutates the original array
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// // const arr3 = [...arr, ...arr2.reverse()];
// // console.log(arr3);

// //  CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);

// // JOIN
// console.log(letters.join(' - '));

// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));

// // getting the last element of an array
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

// console.log('Oluwatobi'.at(-1));
// console.log('Oluwatobi'.at(0));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   movement > 0
//     ? console.log(`Movement${i + 1}: A total of $${movement} was deposited`)
//     : console.log(
//         // `A total of $${String(movement).replace('-', '')} was withdrawn`
//         `Movement${i + 1}: A total of $${Math.abs(movement)} was withdrawn`
//       );
// }
// console.log('===FOEACH===');
// // ForEach
// movements.forEach(function (movement, index, array) {
//   movement > 0
//     ? console.log(
//         `Movement${index + 1}: A total of $${movement} was deposited, ${array}`
//       )
//     : console.log(
//         // `A total of $${String(movement).replace('-', '')} was withdrawn`
//         `Movement${index + 1}: A total of $${Math.abs(
//           movement
//         )} was withdrawn ${array}`
//       );
// });
// 0: function(200)
// 1: function(450)
// 0: function(-400)
// 0: function(3000)

// ForEach With Maps and Sets
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// MAP
// currencies.forEach(function (value, key, map) {
//   if (key === 'USD') {
//     console.log(`${key}: ${value}  `);
//   }
// });

// SETS
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, key, map) {
//   console.log(`${key} : ${value} `);
// });

//  MAP method

// const eurToUsd = 1.1;
// const movementsUSD = movements.map(mov => mov * eurToUsd);
// const movementsUSD = movement.map(function (mov) {
//   return mov * eurToUsd;
// });
// const MUf = [];
// for (const mov of movements) MUf.push(mov * eurToUsd);
// const movementsUSD = movements.map(mov => 23);
// console.log(movementsUSD);
// movements.forEach(function (movement, index, array) {
//   movement > 0
//     ? console.log(
//         `Movement${index + 1}: A total of $${movement} was deposited, ${array}`
//       )
//     : console.log(
//         // `A total of $${String(movement).replace('-', '')} was withdrawn`
//         `Movement${index + 1}: A total of $${Math.abs(
//           movement
//         )} was withdrawn ${array}`
//       );
// const movementsDescription = movements.map(
//   (mov, index) =>
//     `Movement${index + 1}: A total of $${Math.abs(mov)} was ${
//       mov > 0 ? 'deposited' : 'withdrawn'
//     } `
// );
// console.log(movementsDescription);

// FILTER method

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// const deposits = movements.filter(mov => mov > 0);
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(deposits);

// REDUCE Method
const balance = movements.reduce(function () {});

// Coding Challenge 1
// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
// about their dog's age, and stored the data into an array (one array for each). For
// now, they are just interested in knowing whether a dog is an adult or a puppy.
// A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
// old.
// Your tasks:
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages
// ('dogsJulia' and 'dogsKate'), and does the following things:
// 1. Julia found out that the owners of the first and the last two dogs actually have
// cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
// ages from that copied array (because it's a bad practice to mutate function
// parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
// is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
// 🐶
// ")
// 4. Run the function for both test datasets
// Test data:
// § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// Hints: Use tools from all lectures in this section so far 😉
// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];
// const dogsJulia = [9, 16, 6, 8, 3];
// const dogsKate = [10, 5, 6, 1, 4];
// const checkDogs = function (arr1, arr2) {
//   let age;
//   const getCode = function (arr) {
//     arr.forEach(function (age, index) {
//       const adOrPu = age >= 3 ? 'an adult' : 'a puppy';
//       console.log(
//         `Dog Number ${index + 1} is  ${adOrPu}, and is ${age} years old `
//       );
//     });
//   };
//   // const newArr1 = arr1;
//   const newArr1 = arr1.slice();
//   newArr1.splice(-2);
//   newArr1.splice(0, 1);
//   const dogs = newArr1.concat(arr2);
//   getCode(dogs);
//   // getCode(arr2);
// };
// checkDogs(dogsJulia, dogsKate);

// Codewars
// spinWords( "Hey fellow warriors" ) => returns "Hey wollef sroirraw"
// function spinWords(string) {
//   //TODO Have fun :)
//   const splitString = string.split(' ');
//   let empArr = [];
//   splitString.forEach(function (ss) {
//     if (ss.length >= 5) {
//       const newss = ss.split('').reverse().join('');
//       empArr.push(newss);
//     } else {
//       empArr.push(ss);
//     }
//   });
//   return empArr.join(' ');
// }
function delethNth(arr, n) {
  const setArr = new Set(arr).split('');
}
function countoccurences(arr, x) {
  return arr.filter(ar => ar === x).length;
}
console.log(countoccurences([1, 2, 3, 4, 4, 5, 4], 4));
function isIsogram(str) {
  const out = str.toLowerCase().split('');
  for (let i = 0; i < out.length; i++) {
    console.log(`---Testing ${i}`);
    for (let j = i + 1; j < out.length; j++) {
      console.log(out[i], out[j]);
      if (out[i] === out[j]) return false;
    }
  }
  return true;
}
console.log(isIsogram('moose'));
//   // console.log(out);
//   // const o1 = out[0];
//   // for (const [i, o] of out.entries()) {
//   //   console.log(o);
//   // break;

//   // else if(o[i+1] === o[0]) console.log(false);
//   // }
// }
// function isIsogram(str) {
//   const out = str.toLowerCase().split('');
//   const setOut = new Set(out);
//   console.log(out);
//   return [...setOut].length == out.length;
// }
// isIsogram('');
// console.log(isIsogram('Ade1rt'));
// for (let exercise = 1; exercise < 4; exercise++) {
//   console.log(`----- String exercies ${exercise}`);
//   for (let rep = 1; rep < 6; rep++) {
//     console.log(`lifting weight repetition ${rep}`);
//   }
// }
// console.log(spinWords('Olu Wa tobiio num'));

// btnLogin.addEventListener(
//   'click',
//   function (inputLoginUsername, inputLoginPin) {
//     for (const account of accounts) {
//       if (
//         inputLoginUsername.value === account.owner &&
//         inputLoginPin.value === String(account.value)
//       ) {
//         document.querySelector('.app').style.opacity = '100';
//         console.log('working');
//       }
//     }
//   }
// );

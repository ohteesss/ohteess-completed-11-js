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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (movement, i) {
    const depOrWith = movement > 0 ? 'deposit' : 'withdrawal';
    const html = ` 
    <div class="movements__row">
       <div class="movements__type movements__type--${depOrWith}">${
      i + 1
    } ${depOrWith}</div>
       <div class="movements__value">${movement}€</div>
     </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

const calcDisplayBalance = function (accs) {
  // const totalBalance = accs.movements.reduce((acc, mov) => acc + mov, 0);
  // labelBalance.textContent = `${totalBalance} €`;
  // accs.balance = totalBalance;
  accs.balance = accs.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${accs.balance} €`;
};
// calcDisplayBalance(account1.movements);
const calcDisplaySummary = function (accs) {
  // const interestRate = 1.2 / 100;
  const incomes = accs.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${incomes}€`;
  const expenses = accs.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(expenses)}€`;
  const interest = accs.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * accs.interestRate) / 100)
    .filter(mov => mov > 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€ `;
};
// calcDisplaySummary(account1.movements);
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

// UpdatingUI
const updateUI = function (acc) {
  // calculate summary
  calcDisplaySummary(acc);
  // caculate balance
  calcDisplayBalance(acc);
  // display movements
  displayMovements(acc.movements);
};

// Implementing Login
// Event handler

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner
      .split(' ')
      .at(0)} `;
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

// Implementing transfers
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  // console.log(amount, receiverAcc, currentAccount);
  if (
    currentAccount.balance >= amount &&
    receiverAcc &&
    amount > 0 &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // UPDATE UI
    updateUI(currentAccount);
  }
});

// Requesing for Loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= 0.1 * loanAmount)
  ) {
    currentAccount.movements.push(loanAmount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

//  Closing an account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const val = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    console.log(val);
    // Delete account
    accounts.splice(val, 1);

    // hide Ui
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

// Sorting
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// more ways of creating and filling arrays
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));
// const y = new Array(1, 2, 3, 4, 5, 6, 7);
// console.log(y);

const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));
// x.fill(1);
// console.log(x);
x.fill(1, 3, 5);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// Array.from
const y1 = Array.from({ length: 7 }, () => 1);
console.log(y1);

const z = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(z);

const y = Array.from({ length: 100 }, () => Math.trunc(Math.random() * 6) + 1);
console.log(y);

// const movementUI = Array.from(document.querySelectorAll('.movements__value'));
labelBalance.addEventListener('click', function () {
  // const movementUI = Array.from(document.querySelectorAll('.movements__value'));
  // console.log(movementUI.map(el => Number(el.textContent.replace('€', ''))));
  const movementUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  // console.log(movementUI.map(el => Number(el.textContent.replace('€', ''))));
  console.log(movementUI);
});

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// SORT METHOD

// // Strings
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(owners);

// // Numbers
// console.log(movements);

// return < 0, A,B(keep order)
// return > 0, B,A(switch order)

// ascendind order
// movements.sort((a, b) => {
//   if (a > b) {
//     return 1;
//   }
//   if (a < b) {
//     return -1;
//   }
// });
// movements.sort((a, b) => a - b);
// console.log(movements);

// descending order
// console.log(movements.reverse());
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
// movements.sort((a, b) => b - a);
// console.log(movements);

// ////////////////////////
// SOME AND EVERY METHOD
// console.log(movements);

// // EQUALITY
// console.log(movements.includes(-130));

// // SOME: CONDITION
// const anyDeposits = movements.some(mov => mov > 1500);
// console.log(anyDeposits);

// // EVERY
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// // Separate callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// // FLAT AND FLAT MAP
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// // console.log(arr.flat().flat());
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [[4, 5], 6], 7, 8];
// console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// const allMovements = accountMovements.flat();
// const overalBalance = allMovements.reduce((acc, cur) => acc + cur, 0);
// console.log(overalBalance);
// const overalBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, cur) => acc + cur, 0);
// const overalBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, cur) => acc + cur, 0);
// console.log(overalBalance);
// const arrtest = [1, 2, 3, [6, [4, 5]], 7];
// console.log(arrtest.flatMap(arr => arr * 2));
// const totalMovements = [];
// accounts.forEach(acc => totalMovements.push(acc.movements));
// console.log(totalMovements);
// console.log(totalMovements.flat(2).reduce((acc, mov) => acc + mov, 0));
// totalMovements.flat(2).reduce((acc, mov) => acc + mov, 0);

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
// REDUCE
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
// const balance = movements.reduce((acc, cur, i, arr) => acc + cur, 0);
// console.log(balance);
// let sum = 0;
// for (const mov of movements) {
//   sum += mov;
// }
// console.log(sum);

// const maxmovements = movements.reduce(
//   (acc, cur) => {
//     if (acc > cur) return acc;
//     else return cur;
//   },

//   movements[0]
// );
// console.log(maxmovements);
// /////////////////////////////////////////////////
// console.log(balance);

// The Magic of Chaining Method

// PIPELINE
// movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, cur) => acc + cur, 0);

// The Find method
// const firstWithdrawla = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawla);
// let firstWithdrawl = [];
// for (const mov of movements) {
//   if (mov < 0) firstWithdrawl.push(mov);
// }
// console.log(firstWithdrawl.at(0));

// const account = accounts.find(acc => acc.userName == 'js');
// const account = accounts.find(acc => acc.owner == 'Jessica Davis');
// console.log(account);
// let account;
// for (const ccs of accounts) {
//   if (ccs.owner === 'Jessica Davis') account = ccs;
// }
// console.log(account);
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
// Coding Challenge 2
// Let's go back to Julia and Kate's study about dogs. This time, they want to convert
// dog ages to human ages and calculate the average age of the dogs in their study.
// Your tasks:
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
// ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is
// <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
// humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as
// keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know
// from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets
// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]
// let humanAge;
// const calcAverageHumanAge = function (ages) {
//   //   humanAge = age <= 2 ? age.map(ag => ag * 2) : age.map(ag => 16 + ag * 4);
//   // const humanAge = ages.map(ag => (ag <= 2 ? ag * 2 : 16 + ag * 4));
//   // const adultsAge = humanAge.filter(age => age >= 18);
//   // const averageAge =
//   //   adultsAge.reduce((acc, cur) => acc + cur, 0) / adultsAge.length;
//   // const averageAge = humanAge
//   //   .filter(age => age >= 18)
//   //   .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
//   return ages
//     .map(ag => (ag <= 2 ? ag * 2 : 16 + ag * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

//   // return averageAge;
//   // console.log(humanAge);
//   // ages.forEach(function (age) {
//   // });
// };

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

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
// function delethNth(arr, n) {
//   const setArr = new Set(arr).split('');
// }
// function countoccurences(arr, x) {
//   return arr.filter(ar => ar === x).length;
// }
// console.log(countoccurences([1, 2, 3, 4, 4, 5, 4], 4));
// function isIsogram(str) {
//   const out = str.toLowerCase().split('');
//   for (let i = 0; i < out.length; i++) {
//     console.log(`---Testing ${i}`);
//     for (let j = i + 1; j < out.length; j++) {
//       console.log(out[i], out[j]);
//       if (out[i] === out[j]) return false;
//     }
//   }
//   return true;
// }
// console.log(isIsogram('moose'));
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

// btnLogin.addEventListener('click', function (e) {
//   e.preventDefault();
//   for (const account of accounts) {
//     if (
//       inputLoginUsername.value === account.userName &&
//       inputLoginPin.value === String(account.pin)
//     ) {
//       document.querySelector('.app').style.opacity = '100';
//       console.log('working');
//     }
//   }
// });

/////////////////////////////
// Array Methods practice

// 1.
// const totalBalance = accounts
//   .flatMap(acc => acc.movements)
//   .filter(acc => acc > 0)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalBalance);

// // 2.
// // const numberOf1000plus = accounts
// //   .flatMap(acc => acc.movements)
// //   .filter(acc => acc >= 1000).length;
// const numberOf1000plus = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
// console.log(numberOf1000plus);

// 3.
// const balance = {};
// balance.deposits = accounts
//   .flatMap(accs => accs.movements)
//   .reduce((acc, cur) => (cur > 0 ? acc + cur : acc), 0);

// balance.withdrawals = -accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, cur) => (cur < 0 ? acc + cur : acc), 0);

// console.log(balance);

// const sums = accounts
//   .flatMap(accs => accs.movements)
//   .reduce(
//     (acc, cur) => {
//       // cur > 0 ? (acc.deposits += cur) : (acc.withdrawals += cur);
//       acc[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
//       return acc;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );
// console.log(sums);

// number 1 from filter to reduce
// const arayDep = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, cur) => {
//     cur > 0 ? acc.push(cur) : acc;
//     return acc;
//   }, []);
// console.log(arayDep);

// // 4. this is a nice title -> This Is a Nice Title
// const convertTitleCase = function (str) {
//   const exception = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'in', 'with'];
//   const capitalize = str => str.replace(str[0], str.at(0).toUpperCase());
//   const titleCase = str
//     .toLowerCase()
//     .split(' ')
//     .map(st => (!exception.includes(st) ? capitalize(st) : st))
//     .join(' ');
//   return capitalize(titleCase);
// };

// console.log(convertTitleCase('this is a nice title'));
// console.log(
//   convertTitleCase('and this is a LONG title or with But NOT too Long')
// );
// let a = 10;
// a++ !== ++a; // 10 // 11
// console.log(a);

// Coding Challenge 4
// Julia and Kate are still studying dogs, and this time they are studying if dogs are
// eating too much or too little.
// Eating too much means the dog's current food portion is larger than the
// recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10%
// above and 10% below the recommended portion (see hint).
// Your tasks:
// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too
// little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// the owners array, and so this one is a bit tricky (on purpose) 🤓
// 3. Create an array containing all owners of dogs who eat too much
// ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!"
// 5. Log to the console whether there is any dog eating exactly the amount of food
// that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an okay amount of food
// (just true or false)
// 7. Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects 😉)

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
console.log(dogs);
// 1.
const eatToomuch = str => str.curFood >= str.recFoodPor * 1.1;
const eatTooLitlle = str => str.curFood <= str.recFoodPor * 0.9;
const eatNormally = str =>
  str.curFood >= str.recFoodPor * 0.9 && str.curFood <= str.recFoodPor * 1.1;

dogs.forEach(dog => {
  dog.recFoodPor = Math.round(dog.weight ** 0.75 * 28);
});
// 2.
const testEatingLvl = function (str) {
  const dog = dogs.find(dog => dog.owners.includes(str));

  if (eatToomuch(dog)) {
    console.log(`${str}'s Dog eats alot`);
  } else if (eatTooLitlle(dog)) {
    console.log(`${str}'s Dog eats less`);
  } else if (eatNormally(dog)) {
    console.log(`${str}'s dog eats normal`);
  }
};
testEatingLvl('Sarah');

// 3.
const ownersEatTooMuch = dogs
  .filter(dog => eatToomuch(dog))
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs
  .filter(dog => eatTooLitlle(dog))
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);
// 4.

const dogJoinStr = arr => arr.join(' and ');
console.log(`${dogJoinStr(ownersEatTooMuch)}'s dogs eat too much`);
console.log(`${dogJoinStr(ownersEatTooLittle)}'s dogs eat too little`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFoodPor));
// 6.
console.log(dogs.some(dog => eatNormally(dog)));

// 7.
const ownersEatNormal = dogs.filter(dog => eatNormally(dog));
console.log(ownersEatNormal);

// 8.
const sortrecPor = dogs.slice().sort((a, b) => a.recFoodPor - b.recFoodPor);
// console.log(sortrecPor);

// const { ownersEatTooLittle, ownersEatTooMuch } = dogs.reduce(
//   (acc, dog) => {
//     if (dog => dog.curFood >= dog.recFoodPor * 1.1) {
//       acc.ownersEatTooMuch.push(dog.owners);
//     } else if (dogs[val].curFood <= dogs[val].recFoodPor * 0.9) {
//       acc.ownersEatTooLittle.push(dog.owners);
//     }
//     return acc;
//   },
//   { ownersEatTooLittle: [], ownersEatTooMuch: [] }
// );
// console.log(ownersEatTooLittle);
// console.log(ownersEatTooMuch);
// console.log(val);

// console.log(dogs);

/*-------------------------------------------------------*/
/* loops and loop variants, remember "break" breaks out of a loop */
/*-------------------------------------------------------*/
/* If/else if / else */
let var = true;
let var2 = 5;

if(var) {
  console.log('${var} is true');
} else if (var2 >= 3){
  console.log('${var2} is greater than or equal to 3');
} else {
console.log('${var} is false and ${var2} is less than 3');
}

/* for loop */
for (let counter = 0; counter < 4; counter++) {
  console.log(counter);
}

/* for loop on an array */
const animals = ['Grizzly Bear', 'Sloth', 'Sea Lion'];
for (let i = 0; i < animals.length; i++){
  console.log(animals[i]);
}

/* nested loops */
let bobsFollowers = ['Jim', 'Harry', 'Sue', 'Sam'];
let tinasFollowers = ['Jim', 'Sue', 'Sally'];
let mutualFollowers = [];

for (let i=0; i < bobsFollowers.length ; i++) {
  for (let j=0; j < tinasFollowers.length; j++) {
    if (bobsFollowers[i] === tinasFollowers[j]) {
      mutualFollowers.push(bobsFollowers[i]);
    }
  }
}

console.log(mutualFollowers.join(' '));

/* another nested loop */
const myArray = [6, 19, 20];
const yourArray = [19, 81, 2];
for (let i = 0; i < myArray.length; i++) {
  for (let j = 0; j < yourArray.length; j++) {
    if (myArray[i] === yourArray[j]) {
      console.log('Both arrays have the number: ' + yourArray[j]);
    }
  }
}

/* for loop into a while loop */
for (let counterOne = 1; counterOne < 4; counterOne++){
  console.log(counterOne);
}
 /* becomes */
let counterTwo = 1;
while (counterTwo < 4) {
  console.log(counterTwo);
  counterTwo++;
}

/* do while loop */
let countString = '';
let i = 0;
 
do {
  countString = countString + i;
  i++;
} while (i < 5);
 
console.log(countString);



/*-------------------------------------------------------*/
/* Comparison operators: */
/*-------------------------------------------------------*/
/*
Less than: <
Greater than: >
Less than or equal to: <=
Greater than or equal to: >=
Is equal to: ===
Is not equal to: !==

Logical operators:
the and operator (&&)
the or operator (||)
the not operator, otherwise known as the bang operator (!)
*/

/*-------------------------------------------------------*/
/* Switch setup */
/*-------------------------------------------------------*/
let switchValue = 'first place';

switch (switchValue) {

  case 'first place':
    console.log('You get the gold medal!');
    break;  

  case 'second place':
    console.log('You get the silver medal!');
    break;

  case 'third place':
    console.log('You get the bronze medal!');
   break;

  default:
    console.log('No medal awarded.');
    break;
}

/*-------------------------------------------------------*/
/* functions */
/*-------------------------------------------------------*/
/* basic function declarations */
/* basic */
function getReminder() {
  console.log("Water the plants.");
}

/* function passing in a param, where name also has a default name of "Noone" if no name is passed */
function sayThanks(name = 'Noone') {
  console.log(`Thank you for your purchase ${name}! We appreciate your business.`);
}

sayThanks('Cole');

/* function expression */
const plantNeedsWater = function(day) {
  if (day === 'Wednesday') {
    return true;
  } else {
    return false;
  }
};

console.log(plantNeedsWater('Tuesday'));

/* arrow expression */
const rectangleArea = (width, height) => {
  let area = width * height;
  return area;
};

/* arrow function using this. */
const robot = {
energyLevel: 100,
checkEnergy () {
    console.log(`Energy is currently at ${this.energyLevel}%.`)
  }
}

robot.checkEnergy();

/* concise body arrow functions */
const squareNum = (num) => {
  return num * num;
};
/* becomes */
const squareNum = num => num * num;
/* a separate example of the consise body arrow function */
const plantNeedsWater = day => day === 'Wednesday' ? true : false;


/* calling a function */
function sayThanks() {
  console.log('Thank you for your purchase! We appreciate your business.');
}

sayThanks();

/* example of a helper function, which is when the helper function is called inside of another function */
function monitorCount(rows, columns) {
  return rows * columns;
}

function costOfMonitors (rows,columns) {
  return monitorCount(rows,columns) * 200;
}

const totalCost = costOfMonitors(5,4);
console.log(totalCost);

/* Example of a getter and setter method */
const robot = {
  _model: '1E78V2',
  _energyLevel: 100,
  _numOfSensors: 15,
  get numOfSensors(){
    if(typeof this._numOfSensors === 'number'){
      return this._numOfSensors;
    } else {
      return 'Sensors are currently down.'
    }
  },
  set numOfSensors(num) {
    if (typeof num === 'number' && num >= 0) {
      this._numOfSensors = num;
    } else {
      console.log('Pass in a number that is greater than or equal to 0');
    }
  }
};

robot.numOfSensors = 100;
console.log(robot.numOfSensors);

/* example of a factory function */
const robotFactory  = (model,mobile) => {
  return {
    model: model,
    mobile: mobile,
    beep () {
      console.log('Beep Boop');
    }
  }
}

const tinCan = robotFactory('P-500',true);
tinCan.beep();

/* functions as parameters */
const addTwo = num => {
  return num + 2;
}

const checkConsistentOutput = (func, val) => {
  let checkA = val + 2;
  let checkB = func(val);
  if (checkA === checkB) {
    return func(val);
  } else {
    return 'inconsistent results';
  };
}

console.log(checkConsistentOutput(addTwo,65));

/* for each method example */
const fruits = ['mango', 'papaya', 'pineapple', 'apple'];

fruits.forEach(fruitItem => console.log(`I want to eat a ${fruitItem}`));

/* map method examples */
const numbers = [1, 2, 3, 4, 5]; 
 
const bigNumbers = numbers.map(number => {
  return number * 10;
});
/* another map example */
const animals = ['Hen', 'elephant', 'llama', 'leopard', 'ostrich', 'Whale', 'octopus', 'rabbit', 'lion', 'dog'];

const secretMessage = animals.map(animal =>  animal[0]);

console.log(secretMessage.join(''));

/* another map method example */)
const bigNumbers = [100, 200, 300, 400, 500];

const smallNumbers = bigNumbers.map(number => {
  return number / 100;
});

/* example of the filter method */
const words = ['chair', 'music', 'pillow', 'brick', 'pen', 'door']; 
 
const shortWords = words.filter(word => {
  return word.length < 6;
});

/* another example of the filter method */
const randomNumbers = [375, 200, 3.14, 7, 13, 852];


const smallNumbers = randomNumbers.filter( number => {
  return number < 250;
});

/* another example of the filter method */
const favoriteWords = ['nostalgia', 'hyperbole', 'fervent', 'esoteric', 'serene'];

const longFavoriteWords = favoriteWords.filter(word => {
  return word.length > 7;
})

/* example of the find index method */
const jumbledNums = [123, 25, 78, 5, 9]; 
 
const lessThanTen = jumbledNums.findIndex(num => {
  return num < 10;
});

/* another example of the find index method */
const animals = ['hippo', 'tiger', 'lion', 'seal', 'cheetah', 'monkey', 'salamander', 'elephant'];


const foundAnimal = animals.findIndex(animal => {
  return animal === 'elephant';
});

const startsWithS = animals.findIndex(animal => {
  return animal[0] === 's';
});

/* example of the reduce method */
const numbers = [1, 2, 4, 10];
 
const summedNums = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue
})
 
console.log(summedNums) // Output: 17
/*reduce explanation 
Iteration accumulator currentValue  return value
First 1 2 3
Second  3 4 7
Third 7 10  17
*/

/* example of 2 iterator methods */
const cities = ['Orlando', 'Dubai', 'Edinburgh', 'Chennai', 'Accra', 'Denver', 'Eskisehir', 'Medellin', 'Yokohama'];

const nums = [1, 50, 75, 200, 350, 525, 1000];

//  Choose a method that will return undefined
cities.forEach(city => console.log('Have you visited ' + city + '?'));

// Choose a method that will return a new array
const longCities = cities.filter(city => city.length > 7);

// Choose a method that will return a single value
const word = cities.reduce((acc, currVal) => {
  return acc + currVal[0]
}, "C");

console.log(word)

// Choose a method that will return a new array
const smallerNums = nums.map(num => num - 5);

// Choose a method that will return a boolean value
nums.some(num => num < 0);



/*-------------------------------------------------------*/
/* Creating and accessing data in an array */
/*-------------------------------------------------------*/
const famousSayings = ['Fortune favors the brave.', 'A joke is a very serious thing.', 'Where there is love there is life.'];
let listItem = famousSayings[0];
console.log(listItem);
console.log(famousSayings[3]); // will say "brave"

/* nested array setup */
const nestedArr = [[1], [2, 3]];
 
console.log(nestedArr[1]); // Output: [2, 3]

/*-------------------------------------------------------*/
/* domain events */
/*-------------------------------------------------------*/
/* domain event example 1 */ 
let ball = document.getElementById('float-circle');

// Write your code below
let up = function() {
  ball.style.bottom = '250px';
};

let down = function() {
  ball.style.bottom = '50px';
}

document.addEventListener('keydown',up);
document.addEventListener('keyup',down);

/* domain event example 2 */
// This variable stores the "Pick a Color" button
let button = document.getElementById('color-button');

// This variable stores the "Mystery Color" button
let mysteryButton = document.getElementById('next-button');

// This random number function will create color codes for the randomColor variable
function colorValue() {
  return Math.floor(Math.random() * 256);
}

function colorChange(event){
  let randomColor = 'rgb(' + colorValue() + ',' + colorValue() + ',' + colorValue() + ')';
  event.target.style.backgroundColor = randomColor;
}

button.addEventListener('click',colorChange);

mysteryButton.addEventListener('wheel',colorChange);

/* example with adding and removing event listeners */
let fortunes = ["A beautiful, smart, and loving person will be coming into your life.",
  "A fresh start will put you on your way.",
  "A golden egg of opportunity falls into your lap this month.",
  "A smile is your personal welcome mat.",
  "All your hard work will soon pay off."
]

let button = document.getElementById('fortuneButton');
let fortune = document.getElementById('fortune');

function fortuneSelector(){
  let randomFortune = Math.floor(Math.random() * fortunes.length);
  return fortunes[randomFortune];
}

function showFortune(){
  fortune.innerHTML = fortuneSelector();
  button.innerHTML = "Come back tomorrow!";
  button.style.cursor = "default";

  //add your code here
  button.removeEventListener('click',showFortune);
}

button.addEventListener('click', showFortune);

/*-------------------------------------------------------*/
/* Classes example, with the main class HospitalEmployee */
/* adding the shared methods and attributes and two sub  */
/* classes Nurse and Doctor that extend and add their    */
/* own. HospitalEmployee also has a method available only*/
/* to it, called generatePassword, but the two subs don't*/
/*-------------------------------------------------------*/

class HospitalEmployee {
  constructor(name) {
    this._name = name;
    this._remainingVacationDays = 20;
  }
  
  get name() {
    return this._name;
  }
  
  get remainingVacationDays() {
    return this._remainingVacationDays;
  }

  static generatePassword() {
    const pass = Math.floor(Math.random() * 10000)
    return pass;
  }

  takeVacationDays(daysOff) {
    this._remainingVacationDays -= daysOff;
  }
}

class Nurse extends HospitalEmployee {
  constructor(name, certifications) {
    super(name);
    this._certifications = certifications;
  } 
  get certifications(){
    return this._certifications;
  }
  addCertification(newCertification){
    this._certifications.push(newCertification);
    return this._certifications;
  }
}

class Doctor extends HospitalEmployee{
  constructor(name) {
    super(name);
  }
}

const nurseOlynyk = new Nurse('Olynyk', ['Trauma','Pediatrics']);
nurseOlynyk.takeVacationDays(5);
console.log(nurseOlynyk.remainingVacationDays);

nurseOlynyk.addCertification('Genetics');
console.log(nurseOlynyk.certifications)





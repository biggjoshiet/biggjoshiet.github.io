// number one
class Artwork {
  constructor(title, artist){
    this._title = title;
    this._artist = artist;
    this._price = 1000;
  }

  get title(){
    return this._title;
  }

  get artist(){
    return this._artist;
  }

  setPrice(price){
    this._price = price;
  }

  // Add a getter for price
  get price(){
    return this._price;
  }
}

const starryNight = new Artwork('The Starry Night', 'Vincent van Gogh');
// Set the price for starryNight
starryNight.setPrice(1300);

console.log(`${starryNight.title} by ${starryNight.artist} is on sale for $${starryNight.price}!`);


//number two
export const generatePassword = () => {
  let passwordLength = Math.floor(Math.random() * 5 + 4);
  let generatedPassword = Math.floor(Math.random() * Math.pow(10, passwordLength));
  return generatedPassword.toString();
}

// add a checkPassword function that throws an error when password length is less than 6
export const checkPassword = (password) => {
  if (password.length < 6){
    throw new Error('Password is too short! Generate another password.');
  }
}

// export generatePassword and checkPassword functions



//number 3
const assert = require("assert");
const Calculate =  require('./index.js')

describe('Calculate', () => {
  describe('.factorial',() => {
    it('returns the factorial of a number', () => {
      const expectedResult = 120;
      const inputNumber = 5;
      const result = Calculate.factorial(inputNumber);
      
      // Create an assertion for strict equality between result and expectedResult
      assert.strictEqual(result,expectedResult);
    });  
  });
});

//test the script:
mocha test.js

//number 4
const Convert = {
  kmToM(inputValue){
    return parseFloat(Number.parseFloat(inputValue / 1.609).toFixed(2));
  }
}

module.exports = Convert;

//number 5
// Information to reach API
const url = 'https://api.datamuse.com/words?';
const queryParams = 'rel_jjb=';
const wordQuery = 'ocean';

// modify getSuggestions to be async 
const getSuggestions = async() => {
  const endpoint = `${url}${queryParams}${wordQuery}`;
  try {
    // fetch response from endpoint
    const response = await fetch(endpoint,{cache: 'no-cache'});
    if(response.ok){
      const jsonResponse = await response.json();
      renderResponse(jsonResponse);
    }
    // if successful response, get json and render using renderResponse() function

  } catch (error) {
    console.log(error);
  }
}

const renderResponse = (res) => {
    let responseParagraph = document.getElementById('response');
    for(let i = 0; i < 10; i++){
        let newP = document.createElement('P');
        newP.innerHTML = res[i].word;
        responseParagraph.append(newP);
    }
}

getSuggestions();

//number 6
const menu = '{"appetizer":"Shrimp Shumai","main":"Aloo Gobi","dessert":"Key Lime Pie"}';

// Parse menu as a JSON object
let menuObject = JSON.parse(menu);

console.log('Today\'s Menu:');
// Log appetizer, main, and dessert by referencing properties
console.log(`Appetizer: ${menuObject.appetizer}`);
console.log(`Main Course: ${menuObject.main}`);
console.log(`Dessert: ${menuObject.dessert}`);

//number 7
import React from 'react';

// Create a class component called App that renders Hello World! as an H1 element
class App extends React.Component{
  render () {
    return (
      <div>
        <h1>Hello World!</h1>
      </div>
    )
  }
};

export default App;

//number 8
import React from 'react';

class Reserve extends React.Component{
  constructor(props){
    super(props);
    // Set the initial state of reserved to false
    this.state = {reserved: false};
    this.reserveEvent = this.reserveEvent.bind(this);
    // Bind the reserveEvent method to this
    
  }

  reserveEvent(){
    const newReservation = this.state.reserved === true ? false : true;
    // Set reserved state to newReservation
    this.setState({reserved: newReservation});
  }

  render(){
    return(
      <div className='Reserve'>
        {/* Set H2 text to be eventName prop */}
        <h2>{this.props.eventName}</h2>
        <button onClick={this.reserveEvent}>
          RSVP Now!
        </button>
        {this.state.reserved && (
            <p>Youre set! See you there!</p>
        )}
      </div>
    )
  }
}

export default Reserve;

//number 9
import React from 'react';

export class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  startInterval() {
    let delay = 1000;

    this.intervalID = setInterval(() => {
      this.setState({ date: new Date() });
    }, delay);
  }

  componentDidMount() {
    this.startInterval();
  }

// Create a .componentDidUpdate() method that checks if timezone prop has changed. Clear old interval and start new interval.
  componentDidUpdate(prevProps) {
    if (this.props.timezone === prevProps.timezone) {
      return;
    }
    clearInterval(this.intervalID);
    this.startInterval();
}

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    return (
      <div>
        <p className='clock-text'>{this.state.date.toLocaleTimeString('en-us', {'timeZone': this.props.timezone})}</p>
        <p className='timezone-text'>{this.props.timezone}</p>
      </div>
    );
  }
}


//number 10


//number 11

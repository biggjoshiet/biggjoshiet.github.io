/*-------------------------------------------------------*/
/* basic React example */
/*-------------------------------------------------------*/

import React from 'react';
import ReactDOM from 'react-dom';

// Write code here:
const myList = (
  <ul>
    <li>one</li>
    <li>two</li>
    <li>three</li>
  </ul>
)

ReactDOM.render(
  myList,
  document.getElementById('app')
);
/*-------------------------------------------------------*/
/* creating a React Component with variables */
/*-------------------------------------------------------*/
import React from 'react';
import ReactDOM from 'react-dom';

const owl = {
  title: 'Excellent Owl',
  src: 'https://content.codecademy.com/courses/React/react_photo-owl.jpg'
};

// Component class starts here:
class Owl extends React.Component {
  render () {
    return (
      <div>
        <h1>{owl.title}</h1>
        <img 
          src={owl.src}
          alt={owl.title}
        />
      </div>
    )
  }
};

ReactDOM.render(<Owl />,document.getElementById('app'));

/*-------------------------------------------------------*/
/* Example of event listeners with React */
/*-------------------------------------------------------*/
import React from 'react';
import ReactDOM from 'react-dom';

class Button extends React.Component {
  scream() {
    alert('AAAAAAAAHHH!!!!!');
  }

  render() {
    return <button onClick={this.scream}>AAAAAH!</button>;
  }
}

ReactDOM.render(<Button/>,document.getElementById('app'));

/*-------------------------------------------------------*/
/* importing and exporting */
/*-------------------------------------------------------*/
//ProfilePage.js
import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar } from './NavBar.js';

class ProfilePage extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <h1>All About Me!</h1>
        <p>I like movies and blah blah blah blah blah</p>
        <img src="https://content.codecademy.com/courses/React/react_photo-monkeyselfie.jpg" />
      </div>
    );
  }
}

ReactDOM.render(<ProfilePage />,document.getElementById('app'))

//NavBar.js
import React from 'react';

export class NavBar extends React.Component {
  render() {
    const pages = ['home', 'blog', 'pics', 'bio', 'art', 'shop', 'about', 'contact'];
    const navLinks = pages.map(page => {
      return (
        <a href={'/' + page}>
          {page}
        </a>
      )
    });

    return <nav>{navLinks}</nav>;
  }
}

/*-------------------------------------------------------*/
/* example passing event handlers */
/*-------------------------------------------------------*/
//button.js file
import React from 'react';

export class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick}>
        Click me!
      </button>
    );
  }
}

//talker.js file 
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from './Button';

class Talker extends React.Component {
  handleClick() {
    let speech = '';
    for (let i = 0; i < 10000; i++) {
      speech += 'blah ';
    }
    alert(speech);
  }
  
  render() {
    return <Button onClick={this.handleClick}/>;
  }
}

ReactDOM.render(
  <Talker />,
  document.getElementById('app')
);

/*-------------------------------------------------------*/
/* setting default props, if nothing gets passed in */
/*-------------------------------------------------------*/
import React from 'react';
import ReactDOM from 'react-dom';

class Button extends React.Component {
  render() {
    return (
      <button>
        {this.props.text}
      </button>
    );
  }
}

// defaultProps goes here:
Button.defaultProps = {text: 'I am a button'}

ReactDOM.render(
  <Button />, 
  document.getElementById('app')
);

/*-------------------------------------------------------*/
/* example toggling on click, but making sure to */
/* bind this to the constructor */
/*-------------------------------------------------------*/
import React from 'react';
import ReactDOM from 'react-dom';

const green = '#39D1B4';
const yellow = '#FFD712';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: green }
    this.changeColor = this.changeColor.bind(this);
  }

  changeColor() {
    const newColor = this.state.color == green ? yellow : green;
    this.setState({ color: newColor});
  }
  
  render() {
    return (
      <div style={{background: this.state.color}}>
        <h1>
          Change my color
        </h1>
        <button onClick={this.changeColor}>
           Change color
        </button>
      </div>
    );
  }
}

ReactDOM.render(<Toggle />,document.getElementById('app'));
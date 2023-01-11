/*-------------------------------------------------------*/ 
/* examples of using redux to control state, using a reducer */
/*-------------------------------------------------------*/ 
// Define reducer here

const initialState = [ 'Take Five', 'Claire de Lune', 'Respect' ];

const addNewSong = {
  type: 'songs/addSong',
  payload: 'Halo'
};

const removeSong = {
  type: 'songs/removeSong',
  payload: 'Take Five'
};

const removeAll = {
  type: 'songs/removeAll'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'songs/addSong': {
      return [...state, action.payload];
    }
    case 'songs/removeSong': {
      return state.filter(song => song !== action.payload);
    }
    case 'songs/removeAll': {
      return [];
    }
    default: {
      return state;
    }
  }
};

/*-------------------------------------------------------*/ 
/* Rules of Reducers */
/*-------------------------------------------------------*/ 
/* 
They should only calculate the new state value based on the state and action arguments.
They are not allowed to modify the existing state. Instead, they must copy the existing 
state and make changes to the copied values.
They must not do any asynchronous logic or have other “side effects”.

In programming, there is a more general way to describe the three rules of reducers in 
Redux: reducers must make immutable updates and be pure functions.

If a function makes immutable updates to its arguments, it does not change the argument 
but instead makes a copy and changes that copy. (Sounds similar to rule 2, no?) It’s 
called updating immutably because the function doesn’t change, or mutate, the arguments.

If a function is pure, then it will always have the same outputs given the same inputs.
This is a combination of rules 1 and 3:
Reducers should only calculate the new state value based on the state and action arguments.
Reducers must not do any asynchronous logic or other “side effects”.
*/

/*-------------------------------------------------------*/ 
/* example removing splice and using slice */
const removeItemAtIndex = (list, index) => {
 list.splice(index, 1);
 return list;
};

console.log(removeItemAtIndex(['a', 'b', 'c', 'd'], 1));

// becomes
const removeItemAtIndex = (list, index) => {
 return [
   ...list.slice(0,index),
   ...list.slice(index+1, list.length)
 ]
};

console.log(removeItemAtIndex(['a', 'b', 'c', 'd'], 1));

/*-------------------------------------------------------*/ 
/* example making something pure */
const fs = require('fs');
const file = './data.txt';

const capitalizeMessage = (file) => {
  const message = fs.readFileSync(file, 'utf8');
  return message.toUpperCase();
}

console.log(capitalizeMessage(file));

//becomes
const fs = require('fs');
const file = './data.txt';

const capitalizeMessage = (message) => {
  return message.toUpperCase();
}

const message = fs.readFileSync(file, 'utf8');
console.log(capitalizeMessage(message));

/*-------------------------------------------------------*/ 
/* example dispatching actions to the store */
/*-------------------------------------------------------*/ 
import { createStore } from 'redux';

const initialState = 0;
const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(countReducer);
// Dispatch your actions here.
store.dispatch({ type: 'increment'});
store.dispatch({ type: 'increment'});

console.log(store.getState());

store.dispatch({ type: 'decrement'});
store.dispatch({ type: 'decrement'});
store.dispatch({ type: 'decrement'});

console.log(store.getState());

/*-------------------------------------------------------*/ 
/* example of action craetors for dispatches */
/*-------------------------------------------------------*/ 
import { createStore } from 'redux';

// Create your action creators here.
const increment = () => {
  return {
    type: 'increment'
  };
};
const decrement = () => {
  return {
    type: 'decrement'
  };
};


const initialState = 0;
const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(countReducer);

// Modify the dispatches below.
store.dispatch(increment());
store.dispatch(increment());
console.log(store.getState());

store.dispatch(decrement());
store.dispatch(decrement());
store.dispatch(decrement());
console.log(store.getState());

/*-------------------------------------------------------*/ 
/* example subscribing an event listener to changes */
/*-------------------------------------------------------*/ 
import { createStore } from 'redux';

const increment = () => {
  return { type: 'increment' }
}

const decrement = () => {
  return { type: 'decrement' }
}

const initialState = 0;
const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(countReducer);

// Define your change listener function here.


const printCountStatus = () => {
  console.log(`The count is ${store.getState()}`);
};

const unsubscribe = store.subscribe(printCountStatus);

store.dispatch(decrement()); // store.getState() === -1
store.dispatch(increment()); // store.getState() === 0
store.dispatch(increment()); // store.getState() === 1

/*-------------------------------------------------------*/ 
/*
Connecting a Redux store with any UI requires a few consistent 
steps, regardless of how the UI is implemented:

Create a Redux store
Render the initial state of the application.
Subscribe to updates. Inside the subscription callback:
Get the current store state
Select the data needed by this piece of UI
Update the UI with the data
Respond to UI events by dispatching Redux actions

These same steps are followed when building an interface 
using React, Angular, or jQuery.
*/

/*-------------------------------------------------------*/ 
/* example connecting redux to an html webpage */
/*-------------------------------------------------------*/ 
//index.html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="./index.css">
	<title>Learn ReactJS</title>
</head>

<body>
  <main id="app">
    <p id='counter'>Waiting for current state.</p>
    <button id='incrementer'>+</button>
    <button id='decrementer'>-</button>
  </main>
	
</body>
<!-- Do Not Remove -->
<script src="https://content.codecademy.com/courses/React/react-16-redux-4-bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.5/redux.min.js" integrity="sha512-P36ourTueX/PrXrD4Auc1kVLoTE7bkWrIrkaM0IG2X3Fd90LFgTRogpZzNBssay0XOXhrIgudf4wFeftdsPDiQ==" crossorigin="anonymous"></script>
<script src="./store.js"></script>
</html>

// redux part 
/* Note to learners: 
Normally, you would import redux like this:

  import { createStore } from 'redux';

Due to Codecademy's technical limitations 
for testing this exercise, we are using 
`require()`.
*/
const { createStore } = require('redux');

// Action Creators
function increment() { 
  return {type: 'increment'}
}

function decrement() { 
  return {type: 'decrement'}
}

// Reducer / Store
const initialState = 0;
const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1; 
    case 'decrement':
      return state - 1; 
    default:
      return state;
  }
};  
const store = createStore(countReducer);

// HTML Elements
const counterElement = document.getElementById('counter');
const incrementer = document.getElementById('incrementer');
const decrementer = document.getElementById('decrementer');

// Store State Change Listener
const render = () => {
  counterElement.innerHTML = store.getState();
};
store.subscribe(render);
render();

// DOM Event Handlers
const incrementerClicked = () => {
  store.dispatch(increment());
}
incrementer.addEventListener('click', incrementerClicked);
 
const decrementerClicked = () => {
  store.dispatch(decrement());
}
decrementer.addEventListener('click', decrementerClicked);

/*-------------------------------------------------------*/ 
/*
We can be more specific about the common steps involved in 
connecting Redux to a React UI:

A render() function will be subscribed to the store to re-render 
the top-level React Component.
The top-level React component will receive the current value of 
store.getState() as a prop and use that data to render the UI.
Event listeners attached to React components will dispatch 
actions to the store.
*/
/*-------------------------------------------------------*/ 

/*-------------------------------------------------------*/ 
/* Here, you can see the completed light switch application following this pattern.

The render() function is subscribed to the store.
store.getState() is passed as a prop called state to the <LightSwitch /> component.
The LightSwitch component displays the current state of the store, either 'on' or 'off', 
and adjusts the background colors accordingly.
The LightSwitch component declares a click handler that dispatches a toggle() action to the store.*/
/*-------------------------------------------------------*/ 
//store.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

// REDUX CODE
///////////////////////////////////

const toggle = () => {
  return {type: 'toggle'} 
}
 
const initialState = 'off';
const lightSwitchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'toggle':
      return state === 'on' ? 'off' : 'on';
    default:
      return state; 
  }
} 
 
const store = createStore(lightSwitchReducer);

// REACT CODE
///////////////////////////////////
 
// Pass the store's current state as a prop to the LightSwitch component.
const render = () => {
  ReactDOM.render(
    <LightSwitch 
      state={store.getState()}
    />,
    document.getElementById('root')
  )
}
 
render(); // Execute once to render with the initial state.
store.subscribe(render); // Re-render in response to state changes.

// Receive the store's state as a prop.
function LightSwitch(props) {
  const state = props.state; 

  // Adjust the UI based on the store's current state.
  const bgColor = state === 'on' ? 'white' : 'black';
  const textColor = state === 'on' ? 'black' : 'white';  
 
  // The click handler dispatches an action to the store.
  const handleLightSwitchClick = () => {
    store.dispatch(toggle());
  }
 
  return (  
    <div style={{background : bgColor, color: textColor}}>
      <button onClick={handleLightSwitchClick}>
        {state}
      </button>
    </div>
  )
}

//index.html for the store
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="./index.css">
	<title>Learn ReactJS</title>
</head>

<body>
  <div id="root">
  </div>
</body>
<!-- Do Not Remove -->
<script src="https://content.codecademy.com/courses/React/react-16-redux-4-bundle.min.js"></script>
<script src="./store.compiled.js></script>
</html>

/*-------------------------------------------------------*/ 
/* connecting redux and react */
/*-------------------------------------------------------*/ 
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

// REDUX CODE
///////////////////////////////////

const increment = () => {
  return {type: 'increment'} 
}

const decrement = () => { 
  return {type: 'decrement'}
}

const initialState = 0;
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state; 
  }
} 

const store = createStore(counterReducer);

// REACT CODE
///////////////////////////////////

const render = () => {
  ReactDOM.render(
    <CounterApp 
      state={store.getState()}
    />,
    document.getElementById('root')
  )
}
render();

// Render once with the initial state.
// Subscribe render to changes to the store's state.

function CounterApp(props) {
  const state = props.state;
  const onIncrementButtonClicked = () => {
    // Dispatch an 'increment' action.
    store.dispatch(increment());
  };
 
  const onDecrementButtonClicked = () => {
    // Dispatch an 'decrement' action.
    store.dispatch(decrement());
  };
  
  return (   
    <div id='counter-app'>
      <h1> {props.state} </h1>
      <button onClick={onIncrementButtonClicked}>+</button> 
      <button onClick={onDecrementButtonClicked}>-</button>
    </div>
  )
}

store.subscribe(render);

/*-------------------------------------------------------*/ 
/* Defining the actions and payloads for complex state app */
/*-------------------------------------------------------*/ 
import allRecipesData from './data.js';

const initialState = {
  allRecipes: [],
  favoriteRecipes: [],
  searchTerm: ''
};

// Dispatched when the user types in the search input.
// Sends the search term to the store.
const setSearchTerm = (term) => {
  return { 
    type: 'searchTerm/setSearchTerm', 
    payload: term 
  };
}

// Dispatched when the user presses the clear search button.
const clearSearchTerm = () => {
  return { 
    type: 'searchTerm/clearSearchTerm' 
  };
}

// Dispatched when the user first opens the application.
// Sends the allRecipesData array to the store.
const loadData = () => {
  return {
    type: 'allRecipes/loadData',
    action: 'loadData',
    payload: allRecipesData
  };
};

// Dispatched when the user clicks on the heart icon of 
// a recipe in the "All Recipes" section.
// Sends the recipe object to the store.
const addRecipe = (recipe) => {
  return {
    type: 'favoriteRecipes/addRecipe',
    action: 'addRecipe',
    payload: recipe
  };
};

// Dispatched when the user clicks on the broken heart 
// icon of a recipe in the "Favorite Recipes" section.
// Sends the recipe object to the store.
const removeRecipe = (recipe) => {
  return {
    type: 'favoriteRecipes/removeRecipe',
    action: 'removeRecipe',
    payload: recipe
  };
};

//Now that you have defined which changes can occur to 
//your application’s state, you need a reducer to execute those changes.

/*-------------------------------------------------------*/ 
/* with reducer filled in */
/*-------------------------------------------------------*/ 
import { createStore } from 'redux';
import allRecipesData from './data.js';

const initialState = {
  allRecipes: [],
  favoriteRecipes: [],
  searchTerm: ''
};

const setSearchTerm = (term) => {
  return {
    type: 'searchTerm/setSearchTerm',
    payload: term
  };
}

const clearSearchTerm = () => {
  return {
    type: 'searchTerm/clearSearchTerm'
  }; 
};

const loadData = () => {
  return { 
    type: 'allRecipes/loadData', 
    payload: allRecipesData
  };
};

const addRecipe = (recipe) => {
  return { 
    type: 'favoriteRecipes/addRecipe', 
    payload: recipe 
  };
};

const removeRecipe = (recipe) => {
  return { 
    type: 'favoriteRecipes/removeRecipe', 
    payload: recipe 
  };
};

/* Complete this reducer */
const recipesReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'allRecipes/loadData':
      return { 
        ...state,
        allRecipes: action.payload
      }
    case 'searchTerm/clearSearchTerm':
      return {
        ...state,
        searchTerm: ''
      }
    
    case 'searchTerm/setSearchTerm':
      return {...state, searchTerm: action.payload};

    case 'favoriteRecipes/addRecipe':
      return {
        ...state,
        favoriteRecipes: [...state.favoriteRecipes, action.payload]
      };

    case 'favoriteRecipes/removeRecipe':
      return {
        ...state,
        favoriteRecipes: state.favoriteRecipes.filter(element => element.id !== action.payload.id)
      };

    default:
      return state;
  }
};

const store = createStore(recipesReducer);

/* DO NOT DELETE */
printTests();
function printTests() {
  store.dispatch(loadData());
  console.log('Initial State after loading data');
  console.log(store.getState());
  console.log();
  store.dispatch(addRecipe(allRecipesData[0]));
  store.dispatch(addRecipe(allRecipesData[1]));
  store.dispatch(setSearchTerm('cheese'));
  console.log("After favoriting Biscuits and Bulgogi and setting the search term to 'cheese'")
  console.log(store.getState());
  console.log();
  store.dispatch(removeRecipe(allRecipesData[1]));
  store.dispatch(clearSearchTerm());
  console.log("After un-favoriting Bulgogi and clearing the search term:")
  console.log(store.getState());
}

/*-------------------------------------------------------*/ 
/* rewriting ^ to have separate reducers for each slice */
/* and a root reducer to trigger the reducers when the */
/* slice is part of the individual reducer, if it's not */
/* the default case just returns the payload un changed */
/*-------------------------------------------------------*/ 
import { createStore } from 'redux';
import allRecipesData from './data.js';

// Action Creators
////////////////////////////////////////

const addRecipe = (recipe) => {
  return { 
    type: 'favoriteRecipes/addRecipe', 
    payload: recipe 
  };
}

const removeRecipe = (recipe) => {
  return { 
    type: 'favoriteRecipes/removeRecipe', 
    payload: recipe 
  };
}

const setSearchTerm = (term) => {
  return {
    type: 'searchTerm/setSearchTerm',
    payload: term
  }
}


const clearSearchTerm = () => {
  return {
    type: 'searchTerm/clearSearchTerm'
  }; 
}

const loadData = () => {
  return { 
    type: 'allRecipes/loadData', 
    payload: allRecipesData
  }; 
}

// Reducers
////////////////////////////////////////

const initialAllRecipes = [];
const allRecipesReducer = (allRecipes = initialAllRecipes, action) => {
  switch(action.type) {
    case 'allRecipes/loadData':
      return action.payload
    default:
      return allRecipes;
  }
}

const initialSearchTerm = '';
const searchTermReducer = (searchTerm = initialSearchTerm, action) => {
  switch(action.type) {
    case 'searchTerm/setSearchTerm':
      return action.payload;
    case 'searchTerm/clearSearchTerm':
      return '';
    default: 
      return searchTerm;
  }
}

// Create the initial state for this reducer.
var initialFavoriteRecipes = [];
const favoriteRecipesReducer = (favoriteRecipes = initialFavoriteRecipes, action) => {
  switch(action.type) {
    
    // Add action.type cases here.
    case 'favoriteRecipes/addRecipe':
      return [...favoriteRecipes, action.payload];
    case 'favoriteRecipes/removeRecipe':
      return favoriteRecipes.filter(element => element.id !== action.payload.id);
    default:
      return favoriteRecipes;

  }
}

const rootReducer = (state = {}, action) => {
  const nextState = {
    allRecipes: allRecipesReducer(state.allRecipes, action),
    searchTerm: searchTermReducer(state.searchTerm, action),
    favoriteRecipes: favoriteRecipesReducer(state.favoriteRecipes, action)
  } 
  return nextState;
}

const store = createStore(rootReducer);

/*-------------------------------------------------------*/ 
/* combine reducers with root reducer */
/*-------------------------------------------------------*/ 
// Import combineReducers from redux here.
import { createStore, combineReducers } from 'redux';
import allRecipesData from './data.js';

// Action Creators
////////////////////////////////////////

const addRecipe = (recipe) => {
  return { 
    type: 'favoriteRecipes/addRecipe', 
    payload: recipe 
  };
}

const removeRecipe = (recipe) => {
  return { 
    type: 'favoriteRecipes/removeRecipe', 
    payload: recipe 
  };
}

const setSearchTerm = (term) => {
  return {
    type: 'searchTerm/setSearchTerm',
    payload: term
  }
}

const clearSearchTerm = () => {
  return {
    type: 'searchTerm/clearSearchTerm'
  }; 
}

const loadData = () => {
  return { 
    type: 'allRecipes/loadData', 
    payload: allRecipeData
  };
}

// Reducers
////////////////////////////////////////

const initialAllRecipes = [];
const allRecipesReducer = (allRecipes = initialAllRecipes, action) => {
  switch(action.type) {
    case 'allRecipes/loadData': 
      return action.payload
    default:
      return allRecipes;
  }
}

const initialSearchTerm = '';
const searchTermReducer = (searchTerm = initialSearchTerm, action) => {
  switch(action.type) {
    case 'searchTerm/setSearchTerm':
      return action.payload
    case 'searchTerm/clearSearchTerm':
      return ''
    default: 
      return searchTerm;
  }
}

const initialFavoriteRecipes = [];
const favoriteRecipesReducer = (favoriteRecipes = initialFavoriteRecipes, action) => {
  switch(action.type) {
    case 'favoriteRecipes/addRecipe':
      return [...favoriteRecipes, action.payload]
    case 'favoriteRecipes/removeRecipe':
      return favoriteRecipes.filter(recipe => {
        return recipe.id !== action.payload.id
      });
    default:
      return favoriteRecipes;
  }
}

// Create your `rootReducer` here using combineReducers().
const reducers = {
  allRecipes: allRecipesReducer,
  favoriteRecipes: favoriteRecipesReducer,
  searchTerm: searchTermReducer
};

const rootReducer = combineReducers(reducers);
const store = createStore(rootReducer);

/*-------------------------------------------------------*/ 
/* Redux Duck pattern
src/
|-- index.js
|-- app/
    |-- store.js
|-- features/
    |-- featureA/
        |-- featureASlice.js
    |-- featureB/
        |-- featureBSlice.js

*/
/*-------------------------------------------------------*/ 

/*-------------------------------------------------------*/ 
/* refactored for separating the files */
/*-------------------------------------------------------*/ 
//favoriteRecips.js
export const addRecipe = (recipe) => {
  return { 
    type: 'favoriteRecipes/addRecipe', 
    payload: recipe 
  };
}

export const removeRecipe = (recipe) => {
  return { 
    type: 'favoriteRecipes/removeRecipe', 
    payload: recipe 
  };
}
 
const initialFavoriteRecipes = [];
export const favoriteRecipesReducer = (favoriteRecipes = initialFavoriteRecipes, action) => {
  switch(action.type) {
    case 'favoriteRecipes/addRecipe':
      return [...favoriteRecipes, action.payload]
    case 'favoriteRecipes/removeRecipe':
      return favoriteRecipes.filter(recipe => {
        return recipe.id !== action.payload.id
      });
    default:
      return favoriteRecipes;
  }
}

//store.js
import { createStore, combineReducers } from 'redux';
import { favoriteRecipesReducer } from '../features/favoriteRecipes/favoriteRecipesSlice.js';
import { allRecipesReducer } from '../features/allRecipes/allRecipesSlice.js';
import { searchTermReducer } from '../features/searchTerm/searchTermSlice.js';
// Import the slice reducers here.

const reducers = {
  // Add the slice properties here
  favoriteRecipes: favoriteRecipesReducer,
  allRecipes: allRecipesReducer,
  searchTerm: searchTermReducer
};

// Declare the store here.
export const store = createStore(combineReducers(reducers));


/*-------------------------------------------------------*/ 
/* passing state now */
/*-------------------------------------------------------*/ 
//app.js
import React from 'react';

import { AllRecipes } from '../features/allRecipes/AllRecipes.js';
import { SearchTerm } from '../features/searchTerm/SearchTerm.js';

export function App(props) {
  const {state, dispatch} = props;

  const visibleAllRecipes = getFilteredRecipes(state.allRecipes, state.searchTerm);
  const visibleFavoriteRecipes = getFilteredRecipes(state.favoriteRecipes, state.searchTerm);

// You'll add the <FavoriteRecipes /> component in the next exercise!
  return (
    <main>
      <section>
        <SearchTerm
          searchTerm={state.searchTerm}
          dispatch={dispatch}
        />
      </section>
      <section>
        <h2>Favorite Recipes</h2>
        
      </section>
      <hr />
      <section>
        <h2>All Recipes</h2>
        <AllRecipes
          allRecipes={visibleAllRecipes} 
          dispatch={dispatch}
        />
      </section>
    </main>
  )
}

/* Utility Helpers */

function getFilteredRecipes(recipes, searchTerm) {
  return recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
}

//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store.js'
import { App } from './app/App.js';
// Import 'store' here.


const render = () => {
  // Pass `state` and `dispatch` props to <App />
  ReactDOM.render(
    <App 
      state={store.getState()}
      dispatch={store.dispatch}
    />,
    document.getElementById('root')
  )
}
render();
// Subscribe render to changes to the `store`
store.subscribe(render);


/*-------------------------------------------------------*/ 
/* 
Plugging in a feature-component to a Redux application involves the following steps:

Import the React feature-components into the top-level App.js file.
Render each feature-component and pass along the slice of state and the dispatch method as props.
Within each feature-component:
Extract the slice of state and dispatch from props.
Render the component using data from the slice of state.
Import any action creators from the associated slice file.
Dispatch actions in response to user inputs within the component.
This process is not different from how you implemented a React + Redux application in the past. 
Now, however, you must consider that the slices of the store‘s state and the dispatch method must 
be passed through props.
 */
/*-------------------------------------------------------*/ 
//app.js
import React from 'react';

import { AllRecipes } from '../features/allRecipes/AllRecipes.js';
import { SearchTerm } from '../features/searchTerm/SearchTerm.js';

// Import the FavoriteRecipes component here.
import {FavoriteRecipes} from '../features/favoriteRecipes/FavoriteRecipes.js'

export function App(props) {
  const {state, dispatch} = props;

  const visibleAllRecipes = getFilteredRecipes(state.allRecipes, state.searchTerm);
  const visibleFavoriteRecipes = getFilteredRecipes(state.favoriteRecipes, state.searchTerm);

  // Render the <FavoriteRecipes /> component.
  // Pass `dispatch` and `favoriteRecipes` props.
  return (
    <main>
      <section>
        <SearchTerm
          searchTerm={state.searchTerm}
          dispatch={dispatch}
        />
      </section>
      <section>
        <h2>Favorite Recipes</h2>
        <FavoriteRecipes
        dispatch={dispatch} 
          favoriteRecipes={visibleFavoriteRecipes}
        />
      </section>
      <hr />
      <section>
        <h2>All Recipes</h2>
        <AllRecipes
          allRecipes={visibleAllRecipes} 
          dispatch={dispatch}
        />
      </section>
    </main>
  )
}

/* Utility Helpers */

function getFilteredRecipes(recipes, searchTerm) {
  return recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
}

//FavoriteRecipes.js
import React from 'react';
import FavoriteButton from "../../components/FavoriteButton";
import Recipe from "../../components/Recipe";
const unfavoriteIconUrl = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/unfavorite.svg'

// Import removeRecipe from favoriteRecipesSlice.js
import {removeRecipe} from './favoriteRecipesSlice.js'

export const FavoriteRecipes = (props) =>{
  
  const favoriteRecipes = props.favoriteRecipes;
  const dispatch = props.dispatch;
  
  const onRemoveRecipeHandler = (recipe) => {
    // Dispatch a removeRecipe() action.
    dispatch(removeRecipe(recipe))
  };

  // Map the recipe objects in favoriteRecipes to render <Recipe /> components.
  return (
    <div id='favorite-recipes' className="recipes-container">
      {favoriteRecipes.map(createRecipeComponent)}
    </div>
  );

  // Helper Function
  function createRecipeComponent(recipe) {
    return (
      <Recipe recipe={recipe} key={recipe.id}>
        <FavoriteButton
          onClickHandler={() => onRemoveRecipeHandler(recipe)}
          icon={unfavoriteIconUrl}
        >
          Remove Favorite
        </FavoriteButton>
      </Recipe>
    )
  }
  
};


/*-------------------------------------------------------*/ 
/*  */
/*-------------------------------------------------------*/ 

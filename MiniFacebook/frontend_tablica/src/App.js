import './App.css';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import Combine from './reducer/combineReducers'
import Header from './components/Header'
import Page from './components/Page'

import {
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
const store = createStore(Combine)

  return (
   <Provider store = {store}>
     
     <Router>
    <Header/>
    <Page/>
    </Router>
   </Provider>
  );
}

export default App;

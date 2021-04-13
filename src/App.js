import React from 'react'; 
import {
  BrowserRouter as Router,
  Switch,
  Route 
} from "react-router-dom";

import './App.css';
import Navbar from './components/Navbar'; 
import AddLink from './components/pages/AddLink';
import Main from './components/pages/Main';

function App() {
  return (
    <div>
       <Router>  
         <Navbar/>
         <Switch>
           <Route path={"/"} exact component={Main}></Route>
           <Route path={"/addlink"} exact component={AddLink}></Route>
         </Switch>
       </Router> 
    </div>
  );
}

export default App;

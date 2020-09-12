//Import packages
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//Import components
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

//Main application structure and logic
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

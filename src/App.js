import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './common/Header/Header';
import Footer from './common/Footer/Footer';
import Homepage from './Homepage/Homepage';
import About from './About/About';
import Files from './Files/Files';

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Header />

          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/about" component={About} />
            <Route path="/*" component={Files} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

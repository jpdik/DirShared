import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Homepage from './pages/Homepage/Homepage';
import About from './pages/About/About';
import Files from './pages/Files/Files';

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

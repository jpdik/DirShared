import React from 'react';
import { Route, Switch } from "react-router-dom";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Homepage from './pages/Homepage/Homepage';
import About from './pages/About/About';
import Files from './pages/Files/Files';

function App() {
  return (
    <>
        <main>
          <Header />

          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/about" component={About} />
            <Route component={Files} />
          </Switch>
        </main>
        <Footer />
    </>
  );
}

export default App;

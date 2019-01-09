import React, { Component } from 'react';
import './App.css';
// Import Router
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Import Provider from redux, which wraps all the return content in the main App
import { Provider } from 'react-redux';
// Import store for Redux' Provider
import store from './store';

// Import Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              {/* Create routes for register and login */}
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
      
    );
  }
}

export default App;

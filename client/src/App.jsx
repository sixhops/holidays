import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Home from './Home';
import HolidayList from './HolidayList';
import HolidayShow from './HolidayShow';
import HolidayEdit from './HolidayEdit';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <h1>H O L I D A Y S</h1>
            <nav>
              <Link to="/">HOME</Link>{' | '}
              <Link to="/holidays">ALL HOLIDAYS</Link>{' | '}
            </nav>
          </header>
          <Route exact path="/" component={Home} />
          <Route exact path="/holidays" component={HolidayList} />
          <Route exact path="/holidays/:id" render={ (props) => <HolidayShow {...props} /> } />
          <Route exact path="/holidays/edit/:id" render={ (props) => <HolidayEdit {...props} /> } />
          <footer>
            <p>Copyleft 2019 No rights reserved, Okay USA!</p>
          </footer>
        </div>
      </Router>
    )
  }
}

export default App;

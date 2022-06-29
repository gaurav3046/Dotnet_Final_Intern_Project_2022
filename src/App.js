import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'

import HomePage from './components/HomePage'
import {
  Navbar,
  Mess,
  Profile,
  Bill,
  Booking,
  Store,
  Home,
} from "./components/Index";
function App() {
  return (
    <div className="App">
      <Router>
      
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/SignIn" component={SignIn} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Booking" component={Booking} />
          <Route exact path="/Bill" component={Bill} />
          <Route exact path="/mess" component={Mess } />
          {/* <Route exact path="/store" element={<Store />} /> */}
          <Route exact path="/profile" component={Profile } /> 
         <Route exact path="/bill" element={<Bill />} /> 
        </Switch>
      </Router>
    </div>
  )
}

export default App

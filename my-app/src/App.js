
import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as  Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/Login';
// import '../node_modules/bootstrap/dist/css/bootstrap-dark.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screens/Signup.js';
import { CartProvider } from './components/ContextReucer.js';
import MyOrder from './screens/MyOrder.js';

function App() {
  return (
    <>
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path='/' element = {<Home/>}/>
          <Route exact path='/login' element = {<Login/>}/>
          <Route exact path='/signup' element = {<Signup/>}/>
          <Route exact path='/myorder' element = {<MyOrder/>}/>
        </Routes>
      </Router>
      </CartProvider>
    </>
  );
}

export default App;

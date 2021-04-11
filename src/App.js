import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './Components/PrivateRoute';
import ForgotPassword from './Components/ForgotPassword';
import AddCar from './Components/AddCar';
import CarAddSuccess from './Components/CarAddSuccess';
import CarAddFailure from './Components/CarAddFailure';
import Rent from './Components/Rent';
import CarSelection from './Components/CarSelection';
import Reserve from './Components/Reserve';
import RentConfirmation from './Components/RentConfirmation';
import ManageInventory from './Components/ManageInventory';

function App() {
  return (

    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Home}/>
          <Route exact path="/sign-in"><SignIn /></Route>
          <Route exact path="/sign-up"><SignUp /></Route>
          <Route exact path="/forgot-password"><ForgotPassword/></Route>
          <PrivateRoute exact path="/add-car"><AddCar/></PrivateRoute>
          <PrivateRoute exact path="/success-add"><CarAddSuccess/></PrivateRoute>
          <PrivateRoute exact path="/failure-add"><CarAddFailure/></PrivateRoute>
          <PrivateRoute exact path="/rent-info"><Rent/></PrivateRoute>
          <PrivateRoute exact path="/car-selection"><CarSelection/></PrivateRoute>
          <PrivateRoute exact path="/reserve-info"><Reserve/></PrivateRoute>
          <PrivateRoute exact path="/rent-confirmation"><RentConfirmation/></PrivateRoute>
          <PrivateRoute exact path="/manage-inventory"><ManageInventory/></PrivateRoute>
        </Switch> 
      </AuthProvider>

    </Router>




  );
}

export default App;

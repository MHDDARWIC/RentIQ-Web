import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './Components/PrivateRoute';
import ForgotPassword from './Components/ForgotPassword';
import AddCar from './Components/ManageInventory/AddCar';
import CarAddSuccess from './Components/CarAddSuccess';
import CarAddFailure from './Components/CarAddFailure';
import Rent from './Components/Rent';
import CarSelection from './Components/CarSelection';
import Reserve from './Components/Reserve';
import RentConfirmation from './Components/RentConfirmation';
import RentSuccess from './Components/RentSuccess';
import SelectCarRes from './Components/SelectCarRes';
import ReservationConfirmation from './Components/ReservationConfirmation';
import ReservationSuccess from './Components/ReservationSuccess';
import ManageRentals from './Components/ManageRentals/ManageRentals';
import CloseRental from './Components/ManageRentals/CloseRental';
import CloseSuccess from './Components/ManageRentals/CloseSuccess';
import ExtendRental from './Components/ManageRentals/ExtendRental';
import ExtendSuccess from './Components/ManageRentals/ExtendSuccess';
import SplashPage from './Components/SplashPage';
import ManageInventory from './Components/ManageInventory/ManageInventory';
import Maintenance from './Components/ManageInventory/Maintenance';
import AddMaintenance from './Components/ManageInventory/AddMaintenance';
import AllInfo from './Components/ManageInventory/AllInfo';
import DNL from './Components/ManageInventory/DNL';
import ManageReservations from './Components/ManageReservations/ManageReservations';
import CompleteReservation from './Components/ManageReservations/CompleteReservation';
import History from './Components/History';
import DNLWarning from './Components/DNLWarning';

function App() {
  return (

    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Home}/>
          <Route exact path="/sign-in"><SignIn /></Route>
          <Route exact path="/sign-up"><SignUp /></Route>
          <Route exact path="/forgot-password"><ForgotPassword/></Route>
          <Route exact path="/splash"><SplashPage/></Route>
          <PrivateRoute exact path="/add-car"><AddCar/></PrivateRoute>
          <PrivateRoute exact path="/success-add"><CarAddSuccess/></PrivateRoute>
          <PrivateRoute exact path="/failure-add"><CarAddFailure/></PrivateRoute>
          <PrivateRoute exact path="/rent-info"><Rent/></PrivateRoute>
          <PrivateRoute exact path="/car-selection"><CarSelection/></PrivateRoute>
          <PrivateRoute exact path="/reserve-info"><Reserve/></PrivateRoute>
          <PrivateRoute exact path="/rent-confirmation"><RentConfirmation/></PrivateRoute>
          <PrivateRoute exact path="/rent-success"><RentSuccess/></PrivateRoute>
          <PrivateRoute exact path="/select-res"><SelectCarRes/></PrivateRoute>
          <PrivateRoute exact path ="/reservation-confirmation"><ReservationConfirmation/></PrivateRoute>
          <PrivateRoute exact path ="/reservation-success"><ReservationSuccess/></PrivateRoute>
          <PrivateRoute exact path ="/manage-rentals"><ManageRentals/></PrivateRoute>
          <PrivateRoute exact path ="/close-rental"><CloseRental/></PrivateRoute>
          <PrivateRoute exact path ="/close-success"><CloseSuccess/></PrivateRoute>
          <PrivateRoute exact path ="/extend-rental"><ExtendRental/></PrivateRoute>
          <PrivateRoute exact path ="/extend-success"><ExtendSuccess/></PrivateRoute>
          <PrivateRoute exact path ="/manage-inventory"><ManageInventory/></PrivateRoute>
          <PrivateRoute exact path ="/maintenance"><Maintenance/></PrivateRoute>
          <PrivateRoute exact path ="/add-maintenance"><AddMaintenance/></PrivateRoute>
          <PrivateRoute exact path ="/all-info"><AllInfo/></PrivateRoute>
          <PrivateRoute exact path ="/dnl"><DNL/></PrivateRoute>
          <PrivateRoute exact path ="/manage-reservations"><ManageReservations/></PrivateRoute>
          <PrivateRoute exact path ="/complete-reservation"><CompleteReservation/></PrivateRoute>
          <PrivateRoute exact path ="/history"><History/></PrivateRoute>
          <PrivateRoute exact path ="/warning"><DNLWarning/></PrivateRoute>

        </Switch> 
      </AuthProvider>

    </Router>




  );
}

export default App;

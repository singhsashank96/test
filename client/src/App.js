import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeesList from './pages/EmployeesList';
import PublicRoutes from './Routes/PublicRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <ToastContainer/>
        <PublicRoutes/>

    </>
  );
}

export default App;

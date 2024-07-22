import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Customer/SignUp';
import LogIn from './components/Customer/Login';
import AdminLogin from './components/Admin/AdminLogin';
import AdminSignUp from './components/Admin/AdminSignUp';
import Employee from './components/Admin/EmployeeManage';
import MenuManage from './components/Admin/MenuManage';
import MenuForm from './components/Admin/MenuForm';
import EmployeeForm from './components/Admin/EmployeeForm';
import InventoryManage from './components/Admin/InventoryManage';
import InventoryForm from './components/Admin/InventoryForm';
import SupportTicket from './components/Admin/SupportTicket';
import PromotionManage from './components/Admin/PromotionManage';
import OrderPaymentManage from './components/Admin/OrderPaymentManage';
import PromotionForm from './components/Admin/PromotionForm';
import SalaryForm from './components/Admin/SalaryForm';
import EmployeeLogin from './components/Admin/EmployeeLogin';
import HomePage from './components/Customer/HomePage';
import AboutUs from './components/Customer/AboutUs';
import MenuPage from './components/Customer/MenuPage';
import CartPage from './components/Customer/CartPage';
import Feeback from './components/Customer/Feeback';
import Support from './components/Customer/Support';
import Payment from './components/Customer/Payment';
import CashOnDelivery from './components/Customer/CashOnDelivery';
import Profile from './components/Customer/Profile';
import CheckoutPage from './components/Customer/Checkout';
import Orders from './components/Customer/Orders';
import Customer from './components/Admin/Customer';


function App() {
  return (
    <Router>
      <Routes>        
        <Route path="/OrderPaymentManage" element={<OrderPaymentManage />} />
        <Route path="/Customer" element={<Customer />} />
        <Route path="/SalaryForm" element={<SalaryForm />} />
        <Route path="/SupportTicket" element={<SupportTicket />} />
        <Route path="/PromotionForm" element={<PromotionForm />} />
        <Route path="/PromotionManage" element={<PromotionManage />} />
        <Route path="/InventoryManage" element={<InventoryManage />} />
        <Route path="/InventoryForm" element={<InventoryForm />} />
        <Route path="/MenuManage" element={<MenuManage />} />
        <Route path="/MenuForm" element={<MenuForm />} />        
        <Route path="/EmployeeForm" element={<EmployeeForm />} />
        <Route path="/Employee" element={<Employee />} />        
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminSignUp" element={<AdminSignUp />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LogIn />} />
        <Route path="/Register" element={<SignUp />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/MenuPage" element={<MenuPage />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/Feeback" element={<Feeback/>} />
        <Route path="/Support" element={<Support/>} />
        <Route path="/Payment" element={<Payment/>} />
        <Route path="/CashOnDelivery" element={<CashOnDelivery/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/CheckoutPage" element={<CheckoutPage/>} />
        <Route path="/Orders" element={<Orders/>} />
        <Route path="/EmployeeLogin" element={<EmployeeLogin/>} />
      </Routes>
    </Router>
  );
}

export default App;

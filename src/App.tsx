import './Global.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/sign-in';
import RecoverPassword from './pages/auth/recover-password';
import SignUp from './pages/auth/sign-up';
import Header from './components/Header/Header';
import NoMatchPage from './pages/no-match-page';
import Policy from './pages/policy/Policy';
import ProfilePage from './pages/profile-page';
import { ResetPassword } from './pages/reset-password';
import About from './pages/About/About';
import Sidebar from './components/sidebar/Sidebar';
import Home from './pages/Home';
import Footer from './components/footer/Footer';
import { Orders } from './pages/orders/Orders';
import ProgressBar from './components/progressbar/Progressbar';
import Order from './pages/order/Order';
import { CreateOrder } from './pages';

function App() {
  return (
    <div className='app'>
      <Header />
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='sign-in' element={<SignIn />} />
            <Route path='sign-up' element={<SignUp />} />
            <Route path='recover-password' element={<RecoverPassword />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='*' element={<NoMatchPage />} />
            <Route path='policy' element={<Policy />} />
            <Route path='about' element={<About />} />
            <Route path='orders' element={<Orders />} />
            <Route path='orders/:id' element={<Order />} />
            <Route path='orders/create' element={<CreateOrder />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

import './Global.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Header, Sidebar } from './components/common';
import {
  AboutPage, CreateOrder, Home,
  ProfilePage, NoMatchPage, Order, Orders,
  Policy, ProfileActivatePage, RecoverPassword, ResetPassword, SignIn, SignUp
} from './pages';


function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Sidebar>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='profile/:id/activate' element={<ProfileActivatePage />} />
            <Route path='sign-in' element={<SignIn />} />
            <Route path='sign-up' element={<SignUp />} />
            <Route path='recover-password' element={<RecoverPassword />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='*' element={<NoMatchPage />} />
            <Route path='policy' element={<Policy />} />
            <Route path='about' element={<AboutPage />} />
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

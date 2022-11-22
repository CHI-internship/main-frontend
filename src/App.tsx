import './Global.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Header, Sidebar } from './components/common';
import {
  AboutPage, Home, NoMatchPage, Order, Orders,
  Policy, ProfileActivatePage, ProfilePage, RecoverPassword, ResetPassword, SignIn, SignUp
} from './pages';




function App() {
  return (
    <div className='app'>
      <Header />
      <BrowserRouter>
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
          </Routes>
        </Sidebar>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

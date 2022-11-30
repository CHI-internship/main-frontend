import './Global.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Footer, Header, Sidebar } from './components/common';
import { CurrentUserContext, useCurrentUser } from './context';
import {
  AboutPage, CompletedPayment, CreateOrder, Home,
  NoMatchPage, Order, Orders,
  Policy, ProfileActivatePage, ProfilePage, RecoverPassword, ResetPassword, SignIn, SignUp
} from './pages';


function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <CurrentUserContext.Provider value={useCurrentUser()}>
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
              <Route path='success-donate' element={<CompletedPayment />} />
            </Routes>
          </Sidebar>
        </CurrentUserContext.Provider>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

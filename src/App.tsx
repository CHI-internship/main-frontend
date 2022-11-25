import './Global.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Header, Sidebar } from './components/common';
import {
  AboutPage, Home, NoMatchPage, Order, Orders,
  Policy, ProfilePage, RecoverPassword, ResetPassword, SignIn, SignUp
} from './pages';
import { VolunteerProvider } from './components/common/sidebar/VolunteerContext';

function App() {
  return (
    <VolunteerProvider>
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
              <Route path='about' element={<AboutPage />} />
              <Route path='orders' element={<Orders />} />
              <Route path='orders/:id' element={<Order />} />
            </Routes>
          </Sidebar>
        </BrowserRouter>
        <Footer />
      </div>
    </VolunteerProvider>
  );
}

export default App;

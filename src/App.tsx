import './Global.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/sign-in';
import RecoverPassword from './pages/auth/recover-password';
import SignUp from './pages/auth/sign-up';
import Header from './components/Header/Header';
import NoMatchPage from './pages/no-match-page';
import Policy from './pages/Policy/Policy';
import ProfilePage from './pages/profile-page';
import { ResetPassword } from './pages/reset-password';

function App() {
  return (
    <div className='app'>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='profile' element={<ProfilePage />} />
          <Route path='sign-in' element={<SignIn />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='recover-password' element={<RecoverPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='*' element={<NoMatchPage />} />
          <Route path='policy' element={<Policy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './Global.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/sign-in';
import RecoverPassword from './pages/auth/recover-password';
import SignUp from './pages/auth/sign-up';
import Header from './components/header/Header';
import NoMatchPage from './pages/no-match-page';
import Policy from './pages/policy/Policy';
import ProfilePage from './pages/profile-page';
import { ResetPassword } from './pages/reset-password';
import About from './pages/About/About';
import Sidebar from './components/sidebar/Sidebar';
import ProgressBar from './components/progressbar/Progressbar';

function App() {
  return (
    <div className='app'>
      <Header />
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path='profile' element={<ProfilePage />} />
            <Route path='sign-in' element={<SignIn />} />
            <Route path='sign-up' element={<SignUp />} />
            <Route path='recover-password' element={<RecoverPassword />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='*' element={<NoMatchPage />} />
            <Route path='policy' element={<Policy />} />
            <Route path='about' element={<About />} />
            <Route path='progress' element={<ProgressBar moneyHave={30000} moneyNeed={300000} closedAt={new Date('November, 16, 2022 00:00:00')}/>} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  );
}

export default App;

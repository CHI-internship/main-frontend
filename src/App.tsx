import './Global.scss';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/sign-in';
import RecoverPassword from './pages/recover-password';
import SignUp from './pages/sign-up';
import Header from './components/header/Header';
import NoMatchPage from './pages/no-match-page';
import Policy from './pages/policy/Policy';
import { ResetPassword } from './pages/reset-password';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  return (
    <div className='app'>
      <Header />
      <Sidebar>
        <Routes>
          <Route path='sign-in' element={<SignIn />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='recover-password' element={<RecoverPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='*' element={<NoMatchPage />} />
          <Route path='policy' element={<Policy />} />
        </Routes>
      </Sidebar>
    </div>
  );
}

export default App;

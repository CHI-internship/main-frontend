import './Global.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/sign-in';
import RecoverPassword from './pages/recover-password';
import SignUp from './pages/sign-up';
import NoMatchPage from './pages/no-match-page';
import Policy from './pages/Policy/Policy';
import { ResetPassword } from './pages/reset-password';
import Header from './components/header/Header';
import About from './pages/About/About';

function App() {
  return (
    <div className='app'>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='sign-in' element={<SignIn />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='recover-password' element={<RecoverPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='*' element={<NoMatchPage />} />
          <Route path='policy' element={<Policy />} />
          <Route path='about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

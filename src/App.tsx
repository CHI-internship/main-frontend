import './Global.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/sign-in';
import RecoverPassword from './pages/recover-password';
import SignUp from './pages/sign-up';
import Header from './components/Header/Header';
import NoMatchPage from './pages/no-match-page';

function App() {
  return (
    <div className='app'>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='sign-in' element={<SignIn />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='recover-password' element={<RecoverPassword />} />
          <Route path='*' element={<NoMatchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

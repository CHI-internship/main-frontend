import './Global.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import Header from './components/Header/Header';

function App() {
  return (
    <div className='app'>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

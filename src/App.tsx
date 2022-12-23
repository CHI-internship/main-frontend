import './Global.scss';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Footer, Header, Sidebar } from './components/common';
import { CurrentUserContext, useCurrentUser } from './context';
import {
  AboutPage,
  CompletedPayment,
  CreateHint,
  CreateOrder,
  Hint,
  Hints,
  Home,
  NoMatchPage,
  Order,
  Orders,
  Policy,
  ProfileActivatePage,
  ProfilePage,
  RecoverPassword,
  ResetPassword,
  SignIn,
  SignUp,
} from './pages';
import RateboardPage from './pages/Rateboard/rateboard-page';

const queryClient = new QueryClient();

function App() {
  return (
    <div className='app'>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CurrentUserContext.Provider value={useCurrentUser()}>
            <Header />
            <Sidebar>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='profile' element={<ProfilePage />} />
                <Route
                  path='profile/:id/activate'
                  element={<ProfileActivatePage />}
                />
                <Route path='sign-in' element={<SignIn />} />
                <Route path='sign-up' element={<SignUp />} />
                <Route path='recover-password' element={<RecoverPassword />} />
                <Route path='reset-password' element={<ResetPassword />} />
                <Route path='*' element={<NoMatchPage />} />
                <Route path='policy' element={<Policy />} />
                <Route path='about' element={<AboutPage />} />
                <Route path='projects' element={<Orders />} />
                <Route path='projects/:id' element={<Order />} />
                <Route path='orders/create' element={<CreateOrder />} />
                <Route path='hints' element={<Hints />} />
                <Route path='hints/:id' element={<Hint />} />
                <Route path='success-donate' element={<CompletedPayment />} />
                <Route path='hints/create' element={<CreateHint />} />
                <Route path='rateboard' element={<RateboardPage/>} />
              </Routes>
            </Sidebar>
          </CurrentUserContext.Provider>
        </BrowserRouter>
        <Footer />
        <ReactQueryDevtools initialIsOpen={false} position='bottom-left' />
      </QueryClientProvider>
    </div>
  );
}

export default App;

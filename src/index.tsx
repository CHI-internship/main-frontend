import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SECRET!} >
      <App />
    </GoogleReCaptchaProvider>
  </React.StrictMode>
)
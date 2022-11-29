import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const { executeRecaptcha } = useGoogleReCaptcha();

export async function recaptchaVerify() {
    if (executeRecaptcha) return executeRecaptcha('action');
}
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export async function recaptchaVerify() {
    const { executeRecaptcha } = useGoogleReCaptcha();
    if (executeRecaptcha) return executeRecaptcha('action');
}
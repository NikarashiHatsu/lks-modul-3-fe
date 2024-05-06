export default {
  env: import.meta.env.VITE_APP_ENV,
  apiUrl: import.meta.env.VITE_APP_ENV == 'development'
    ? import.meta.env.VITE_APP_API_URL_DEV
    : import.meta.env.VITE_APP_API_URL_PROD,
  apiUrlDev: import.meta.env.VITE_APP_API_URL_DEV,
  apiUrlProd: import.meta.env.VITE_APP_API_URL_PROD,
};
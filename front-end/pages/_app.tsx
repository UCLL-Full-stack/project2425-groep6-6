import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import '@styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp); 

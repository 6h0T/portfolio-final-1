import { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Otras etiquetas meta */}
        <meta property="og:image" content="/preview-image.png" />
        <meta name="twitter:image" content="/preview-image.png" />
        {/* Otras etiquetas meta */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 
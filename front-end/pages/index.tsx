import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Restaurants app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <Image
            src="/images/icon.jpg"
            alt="icon Logo"
            className={styles.vercelLogo}
            width={100}
            height={100}
          />
          <h1>Welcome!</h1>
        </span>

        <div className={styles.description}>
          <p>This is our restaurant app.</p>
        </div>
      </main>
    </>
  );
};

export default Home;

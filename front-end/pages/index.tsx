import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import UserTable from "@components/homepage/usertable";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: React.FC = () => {
  const { t } = useTranslation(); 

  return (
    <>
      <Head>
        <title>{t("home.title")}</title> 
        <meta name="description" content={t("home.metaDescription")} />
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
          <h1>{t("home.welcome")}</h1> 
        </span>

        <div className={styles.description}>
          <p>{t("home.description")}</p>
        </div>
        
      </main>
    </>
  );
};

export const getServerSideProps = async (context: { locale: any; }) => {
  const { locale } = context; 
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])), 
    },
  };
};

export default Home;

import Head from "next/head";
import Header from "@components/header";
import UserLoginForm from "@components/users/UserLoginForm";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next"; 

const Login: React.FC = () => {
  const { t } = useTranslation(); 

  return (
    <>
      <Head>
        <title>{t("login.title")}</title> 
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <section className="p-6 min-h-screen flex flex-col items-center">
          <h1>{t("login.title")}</h1> 
          <UserLoginForm />
        </section>
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

export default Login;

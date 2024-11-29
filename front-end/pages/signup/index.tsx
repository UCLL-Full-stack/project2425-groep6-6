import Head from "next/head";
import Header from "@components/header";
import UserSignUpform from "@components/users/userSignUpForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>User Login</title>
            </Head>
            <Header />
            <main >
            <section className="p-6 min-h-screen flex flex-col items-center">
            <UserSignUpform role="customer" />
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
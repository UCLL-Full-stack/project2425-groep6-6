import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@components/header";
import RoleSelection from '@components/admin/RoleSelection'; 
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const AdminPage: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();  
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [notAuthorized, setNotAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role !== "admin") {
      setNotAuthorized(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      setIsAdmin(true);
    }
  }, [router]);

  if (notAuthorized) {
    return (
      <>  
        <Header />
        <div> You are not Authorized to see this page. You are directed to the login page.</div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t('admin.dashboardTitle')}</title> 
      </Head>
      <Header />
      <RoleSelection onRoleSelect={function (role: "admin" | "chef" | "bartender"): void {
      } } />
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

export default AdminPage;

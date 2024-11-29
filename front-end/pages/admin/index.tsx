import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@components/header";
import SignupForm from "@components/users/userSignUpForm"; 
import styles from "/styles/userLoginForm.module.css"; 
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";  

const AdminPage: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();  
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'chef' | 'bartender' | null>(null);

  useEffect(() => {
    const role = sessionStorage.getItem("role");

    if (role !== "admin") {
      router.push("/login");
    } else {
      setIsAdmin(true);
    }
  }, [router]);

  const handleRoleSelection = (role: 'admin' | 'chef' | 'bartender') => {
    setSelectedRole(role);
  };

  if (!isAdmin) {
    return null; 
  }

  return (
    <>
      <Head>
        <title>{t('admin.dashboardTitle')}</title> 
      </Head>
      <Header />
      <div className={styles.container}>
        <div>
          <h1>{t('admin.dashboardTitle')}</h1>
          <p>{t('admin.dashboardDescription')}</p>
          <div>
            <button onClick={() => handleRoleSelection('admin')}>{t('admin.addAdmin')}</button>
            <button onClick={() => handleRoleSelection('chef')}>{t('admin.addChef')}</button>
            <button onClick={() => handleRoleSelection('bartender')}>{t('admin.addBartender')}</button>
          </div>

          {selectedRole && <SignupForm role={selectedRole} />}
        </div>
      </div>
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

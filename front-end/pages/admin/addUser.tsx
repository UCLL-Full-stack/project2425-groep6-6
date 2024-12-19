import { useRouter } from 'next/router';
import SignupForm from '@components/users/userSignUpForm';
import Header from '@components/header';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from 'react';

const AddUser: React.FC = () => {
  const router = useRouter();
  const { role } = router.query;
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const storedRole = sessionStorage.getItem('role');
    if (storedRole !== 'admin') {
        setTimeout(() => {
          router.push('/login');
        }, 2000);
    } else {
      setIsAdmin(true);
    }
  }, [router]);

  if (!isAdmin) {
    return <div>Redirecting to login page...</div>; 
  }

  if (!role) {
    return <div>Role not selected.</div>;
  }

  return (
    <div >
      <Header />
      <div className="d-flex flex-column justify-content-center align-items-center">
      <h1>Add New User</h1>
      </div>
      <SignupForm role={role as 'admin' | 'chef' | 'bartender'} />
    </div> 
   
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

export default AddUser;

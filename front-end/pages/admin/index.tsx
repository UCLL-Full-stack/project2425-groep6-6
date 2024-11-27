import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@components/header";
import SignupForm from "@components/users/userSignUpForm"; 
import styles from "/styles/userLoginForm.module.css"; 


const AdminPage: React.FC = () => {
  const router = useRouter();
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
    
    <><Head>
        <title>Admin Dashboard</title>
      </Head>
      <Header />
    <div className={styles.container}>
      
      <div>
        <h1>Admin Dashboard</h1>
        <p>Welcome, admin! You have access to the admin dashboard.</p>       
        <div>
          <button onClick={() => handleRoleSelection('admin')}>Add Admin</button>
          <button onClick={() => handleRoleSelection('chef')}>Add Chef</button>
          <button onClick={() => handleRoleSelection('bartender')}>Add Bartender</button>
        </div>

        {selectedRole && <SignupForm role={selectedRole} />}
      </div>
    </div>

     
    </>
  );
};

export default AdminPage;

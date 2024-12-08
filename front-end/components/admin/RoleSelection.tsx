import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import SignupForm from '@components/users/userSignUpForm';
import styles from '/styles/userLoginForm.module.css';

type Props = {
  onRoleSelect: (role: 'admin' | 'chef' | 'bartender') => void;
};

const RoleSelection: React.FC<Props> = ({ onRoleSelect }) => {
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState<'admin' | 'chef' | 'bartender' | null>(null);

  const handleRoleSelection = (role: 'admin' | 'chef' | 'bartender') => {
    setSelectedRole(role);
    onRoleSelect(role);
  };

  return (
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
  );
};

export default RoleSelection;

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import styles from '/styles/userLoginForm.module.css';

type Props = {
  onRoleSelect: (role: 'admin' | 'chef' | 'bartender') => void;
};

const RoleSelection: React.FC<Props> = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleRoleSelection = (role: 'admin' | 'chef' | 'bartender') => {
    router.push(`/admin/addUser?role=${role}`);
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
      </div>
    </div>
  );
};

export default RoleSelection;

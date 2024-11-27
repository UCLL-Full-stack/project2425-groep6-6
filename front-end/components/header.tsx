import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = sessionStorage.getItem('username');
      const storedRole = sessionStorage.getItem('role');
      if (storedUsername) {
        setUsername(storedUsername);
      }
      if (storedRole) {
        setRole(storedRole);
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.clear();
      setUsername(null);
      setRole(null);
      router.push('/');
    }
  };

  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient d-flex align-items-center justify-content-between">
      <nav className="nav justify-content-center flex-grow-1">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          Home
        </Link>

        <Link href="/restaurants" className="nav-link px-4 fs-5 text-white">
          Restaurants
        </Link>

        <Link href="/menu" className="nav-link px-4 fs-5 text-white">
          Menu
        </Link>

        {role && (role === 'chef' || role === 'bartender') && (
          <Link href="/order/reservations" className="nav-link px-4 fs-5 text-white">
            Reservations
          </Link>
        )}
          {role && (role === 'admin' ) && (
          <Link href="/admin" className="nav-link px-4 fs-5 text-white">
            Admin
          </Link>
        )}

        {username && (
          <button
            className="nav-link px-4 fs-5 text-white bg-transparent border-0"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

        {!username && (
          <Link href="/login" className="nav-link px-4 fs-5 text-white">
            Log in
          </Link>
        )}
      </nav>

      <div className="d-flex align-items-center text-white ms-auto">
        {username && <span className="fs-5">{username}</span>}
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Navbar() {
  const history = useHistory();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          Клиника мануальной терапии
        </Link>
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <Link to="/profile">Личный кабинет</Link>
              <button onClick={handleLogout} className="button secondary">Выйти</button>
            </>
          ) : (
            <>
              <Link to="/register" className="button">Записаться на приём</Link>
              <Link to="/login" className="button secondary">Войти</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AuthContext from '../contexts';

const Nav = () => {
  const { t } = useTranslation();
  const { userGroup, handleLogout } = useContext(AuthContext);
  const username = localStorage.getItem('user');

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('hexletChat')}</a>
        {userGroup === 'user' ? (
          <>
            <span className="navbar-text">
              {t('welcome')}
              {', '}
              {username}
            </span>
            <Button variant="outline-primary" onClick={handleLogout}>{t('logout')}</Button>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Nav;

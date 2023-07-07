import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AuthContext from '../contexts';

const Nav = () => {
  const { t } = useTranslation();
  const { getToken, handleLogout } = useContext(AuthContext);
  const username = localStorage.getItem('user');

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('nav.hexletChat')}</a>
        {getToken() ? (
          <>
            <span className="navbar-text">
              {t('nav.welcome')}
              {', '}
              {username}
            </span>
            <Button variant="outline-primary" onClick={handleLogout}>{t('nav.logout')}</Button>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Nav;

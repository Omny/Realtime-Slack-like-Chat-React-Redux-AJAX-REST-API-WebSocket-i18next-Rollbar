import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks';

const Nav = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const username = auth.getUsername();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('nav.hexletChat')}</a>
        {auth.loggedIn() ? (
          <>
            <span className="navbar-text">
              {t('nav.welcome')}
              {', '}
              {username}
            </span>
            <Button variant="outline-primary" onClick={auth.handleLogout}>{t('nav.logout')}</Button>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Nav;

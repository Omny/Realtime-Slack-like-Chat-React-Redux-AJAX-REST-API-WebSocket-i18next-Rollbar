import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import AuthContext from '../contexts';

const Nav = () => {
  const { userGroup, handleLogout } = useContext(AuthContext);
  const username = localStorage.getItem('user');

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {userGroup === 'user' ? (
          <>
            <span className="navbar-text">
              Добро пожаловать,
              {' '}
              {username}
            </span>
            <Button variant="outline-primary" onClick={handleLogout}>Выйти</Button>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Nav;

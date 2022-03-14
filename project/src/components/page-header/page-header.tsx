import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/';
import { store } from '../../store';
import { logoutAction } from '../../store/api-actions';
import { AuthorizationStatus } from '../../const';
import Logo from '../logo/logo';

function PageHeader(): JSX.Element {
  const email = useAppSelector((state) => state.main.email);
  const authorizationStatus = useAppSelector((state) => state.main.authorizationStatus);
  const handleClick = () => {
    store.dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            {authorizationStatus === AuthorizationStatus.Auth ?
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__user-name user__name">{email}</span>
                  </Link>
                </li>
                <li onClick={handleClick} className="header__nav-item">
                  <Link className="header__nav-link" to="/">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
              :
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to='/login'>
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>}
          </nav>
        </div>
      </div>
    </header>
  );
}
export default PageHeader;

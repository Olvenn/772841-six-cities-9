import { Link } from 'react-router-dom';
import Logo from '../logo/logo';
import LoginForm from '../login-form/login-form';
import { AppRoute, AuthorizationStatus, cities } from '../../const';
import { shuffle } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks/';
import { changeCity, getActiveOffer } from '../../store/reducers/offers';
import { redirectToRoute } from '../../store/action';
import { useEffect } from 'react';
import {getAuthorizationStatus} from '../../store/reducers/selectors';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const city = shuffle(Object.values(cities))[0];
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Root));
    }
  });

  const handleClick = () => {
    dispatch(changeCity(city));
    dispatch(getActiveOffer(-1));
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm city={city} />
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span onClick={handleClick} data-testid="city">{city}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
export default LoginPage;

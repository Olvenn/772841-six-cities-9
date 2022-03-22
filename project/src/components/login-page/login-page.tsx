import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/reducers/offers';
import Logo from '../logo/logo';
import LoginForm from '../login-form/login-form';
import { cities } from '../../const';
import { shuffle } from '../../utils';


function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const city = shuffle(Object.values(cities))[0];
  dispatch(changeCity(city));

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
          <LoginForm />
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>{city}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
export default LoginPage;

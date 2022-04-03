import { Link } from 'react-router-dom';
import Logo from '../logo/logo';
import LoginForm from '../login-form/login-form';
import { cities } from '../../const';
import { shuffle } from '../../utils';
import { useAppDispatch } from '../../hooks/';
import { changeCity, getActiveOffer } from '../../store/reducers/offers';


function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const city = shuffle(Object.values(cities))[0];

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

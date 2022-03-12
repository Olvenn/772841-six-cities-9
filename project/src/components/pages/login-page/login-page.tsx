import { Link } from 'react-router-dom';
import {useAppDispatch} from '../../../hooks';
import {FormEvent} from 'react';
import {loginAction} from '../../../store/api-actions';
import { useState } from 'react';
import Logo from '../../logo/logo';
import {AuthData} from '../../../types/auth-data';


function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setLogin(evt.target.value);
  };
  const handlePasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setPassword(evt.target.value);
  };
  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (login !== null && password !== null) {
      onSubmit({
        login: login,
        password: password,
      });
    }
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
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" onSubmit={handleSubmit} method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" value={login} onChange={handleLoginChange} type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" value={password} onChange={handlePasswordChange} type="password" name="password" placeholder="Password" required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
export default LoginPage;

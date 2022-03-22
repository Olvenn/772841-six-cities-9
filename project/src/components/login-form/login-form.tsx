import { useAppDispatch } from '../../hooks';
import { FormEvent } from 'react';
import { loginAction } from '../../store/api-actions';
import { useState } from 'react';
import { AuthData } from '../../types/auth-data';

function LoginForm(): JSX.Element {
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
  );
}
export default LoginForm;

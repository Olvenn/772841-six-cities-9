import Logo from '../logo/logo';
import './not-found-page.css';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">

          </div>
        </div>
      </header>

      <main className="page__main">
        <section className="page__back">
          <div>
            <Logo />
          </div>
          <h1>404. Page not found</h1>
          <a className="form__submit button" href="/">Back to main page</a>
        </section>
      </main>
    </div>
  );
}

export default NotFoundPage;

import './loading-page.css';
import preloader from './Ghost.gif';

function LoadingScreen(): JSX.Element {
  return (
    <div className='coverLoading'>
      <p className="load">Loading ...</p>
      <img className='coverImg' src={`${preloader}`} alt='Preloader' />
    </div>
  );
}

export default LoadingScreen;

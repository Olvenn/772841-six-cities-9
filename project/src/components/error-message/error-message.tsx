import { useAppSelector } from '../../hooks';
import { getError } from '../../store/reducers/selectors';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getError);

  if (error) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '200px',
          right: '130px',
          padding: '20px',
          backgroundColor: '#d96666',
          color: 'white',
          borderRadius: '5px',
        }}
      >
        {error}
      </div>
    );
  }

  return null;
}

export default ErrorMessage;

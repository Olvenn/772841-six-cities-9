import { useAppSelector } from '../../hooks';

function ErrorMessage(): JSX.Element | null {
  const { error } = useAppSelector((state) => state.main);

  if (error) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '50px',
          right: '30px',
          padding: '10px',
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
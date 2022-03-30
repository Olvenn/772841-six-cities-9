import { NameSpace } from '../../const';
import { useAppSelector } from '../../hooks';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector((state) => state[NameSpace.main].error);

  if (error) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '150px',
          right: '130px',
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

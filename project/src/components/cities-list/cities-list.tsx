import { Link } from 'react-router-dom';

type CitiesListProps = {
  cityActive: string;
  city: string;
  onClick: (item: string) => void;
}

function CitiesList({ cityActive, city, onClick }: CitiesListProps): JSX.Element {
  const handleClick = () => {
    onClick(city);
  };

  return (
    <li onClick={handleClick} className="locations__item">
      <Link className={city === cityActive ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} to='/'>
        <span>{city}</span>
      </Link>
    </li>
  );
}
export default CitiesList;

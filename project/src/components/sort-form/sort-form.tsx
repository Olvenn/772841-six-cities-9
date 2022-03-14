import { useState } from 'react';
import { SortTypes } from '../../const';
import SortOption from '../sort-options/sort-options';

type SortFormProps = {
  onSortClick: (item: string) => void;
  sortType: string;
}

function SortForm({ onSortClick, sortType }: SortFormProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleIsOpenClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={handleIsOpenClick} className="places__sorting-type" tabIndex={0}>
        {SortTypes[sortType]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {(Object.entries(SortTypes)).map(([key, option]) => (
          <SortOption
            onSortClick={onSortClick}
            key={key}
            keyOption={key}
            option={option}
            optionActive={sortType}
          />
        ))}
      </ul>
    </form >
  );
}
export default SortForm;

import { useState } from 'react';
import { SortTypes } from '../../const';
import SortOption from '../sort-options/sort-options';

type SortFormProps = {
  onSortClick: (item: SortTypes) => void;
  sortType: SortTypes;
}

export const sortingLabels: Record<SortTypes, string> = {
  [SortTypes.Default]: 'Popular',
  [SortTypes.PriceLowToHigh]: 'Price: low to high',
  [SortTypes.PriceHighToLow]: 'Price: high to low',
  [SortTypes.Rating]: 'Top rated first',
};

function SortForm({ onSortClick, sortType }: SortFormProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleIsOpenClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={handleIsOpenClick} className="places__sorting-type" tabIndex={0}>
        {sortingLabels[sortType]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {(Object.entries(sortingLabels)).map(([value, label]) => (
          <SortOption
            onSortClick={onSortClick}
            key={value}
            value={value as SortTypes}
            label={label}
            optionActive={sortType}
          />
        ))}
      </ul>
    </form >
  );
}
export default SortForm;

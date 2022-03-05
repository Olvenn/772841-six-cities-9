import { useState } from 'react';
import { SortTypes } from '../../const';
import SortOptions from '../sort-options/sort-options';

function SortForm(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleIsOpenClick = () => {
    setIsOpen(!isOpen);
  };

  const [typeSort, setTypeSort] = useState<string>('Popular');
  const handleTypeSort = (option: string) => {
    // eslint-disable-next-line no-console
    // console.log(typeSort);
    setTypeSort(option);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={handleIsOpenClick} className="places__sorting-type" tabIndex={0}>
        {typeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {(Object.entries(SortTypes)).map(([key, option]) => (
          <SortOptions
            key={key}
            keyOption={key}
            option={option}
            onClick={handleTypeSort}
            optionActive={typeSort}
          />
        ))}
      </ul>
    </form >
  );
}
export default SortForm;

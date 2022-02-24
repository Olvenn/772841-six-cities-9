import { useState } from 'react';

import { SortOptions } from '../../const';

const optionActive = 'Popular';

function SortForm(): JSX.Element {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={() => {setIsOpen(!isOpen);}} className="places__sorting-type" tabIndex={0}>
        {optionActive}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {Object.values(SortOptions).map((option) =>
          <li key={option} className={`places__option ${optionActive === option ? 'places__option--active' : ''}`} tabIndex={0}>{option}</li>)}
      </ul>
    </form >
  );
}

export default SortForm;

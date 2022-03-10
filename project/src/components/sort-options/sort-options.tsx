import { FunctionString } from '../../types/types';

type SortOptionsProps = {
  optionActive: string;
  keyOption: string;
  option: string;
  onClick: FunctionString;
  onSortClick: FunctionString;
}

function SortOptions({ option, onClick, optionActive, keyOption, onSortClick }: SortOptionsProps): JSX.Element {
  const handleClick = () => {
    onClick(keyOption);
    onSortClick(keyOption);
  };

  return (
    <li onClick={handleClick} className={`places__option ${optionActive === keyOption ? 'places__option--active' : ''}`} tabIndex={0}>{option}</li>
  );
}
export default SortOptions;

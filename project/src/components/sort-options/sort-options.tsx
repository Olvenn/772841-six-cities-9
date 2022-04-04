import { SortTypes } from '../../const';

type SortOptionProps = {
  optionActive: string;
  value: SortTypes;
  label: string;
  onSortClick: (item: SortTypes) => void;
  onSortChangeClick: () => void;
}

function SortOption({label, optionActive, value, onSortClick, onSortChangeClick }: SortOptionProps): JSX.Element {
  const handleClick = () => {
    onSortClick(value);
    onSortChangeClick();
  };

  return (
    <li onClick={handleClick} className={`places__option ${optionActive === value ? 'places__option--active' : ''}`} tabIndex={0}>{label}</li>
  );
}
export default SortOption;

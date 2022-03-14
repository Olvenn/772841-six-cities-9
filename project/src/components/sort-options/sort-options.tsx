type SortOptionProps = {
  optionActive: string;
  keyOption: string;
  option: string;
  onSortClick: (item: string) => void;
}

function SortOption({ option, optionActive, keyOption, onSortClick }: SortOptionProps): JSX.Element {
  const handleClick = () => {
    onSortClick(keyOption);
  };

  return (
    <li onClick={handleClick} className={`places__option ${optionActive === keyOption ? 'places__option--active' : ''}`} tabIndex={0}>{option}</li>
  );
}
export default SortOption;

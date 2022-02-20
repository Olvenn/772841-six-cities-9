export const shuffle = (items: string[]) =>  items.sort(() => Math.random() - 0.5);

export const firstToUpperCase = (str: string) => {
  if (!str)
  {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

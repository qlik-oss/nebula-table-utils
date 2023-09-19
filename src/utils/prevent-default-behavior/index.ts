const preventDefaultBehavior = (evt: React.KeyboardEvent | MouseEvent | React.MouseEvent<HTMLLIElement>) => {
  evt.stopPropagation();
  evt.preventDefault();
};

export default preventDefaultBehavior;

/**
 * short hand for stopPropagation and preventingDefault
 * has a union of all possible event types
 */
const preventDefaultBehavior = (
  evt: React.KeyboardEvent | React.MouseEvent | MouseEvent | KeyboardEvent | TouchEvent
) => {
  evt.stopPropagation();
  evt.preventDefault();
};

export default preventDefaultBehavior;

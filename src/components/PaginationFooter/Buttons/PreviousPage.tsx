import React from 'react';
import Button from './Button';
import { usePaginationContext } from '../context/PaginationProvider';

const PreviousPage = () => {
  const { pageInfo, width } = usePaginationContext();
  const onFirstPage = pageInfo.page === 0;

  if (width <= 350) {
    return null;
  }

  return <Button type="PreviousPage" disabledCondition={onFirstPage} pageNumber={pageInfo.page - 1} />;
};

export default PreviousPage;

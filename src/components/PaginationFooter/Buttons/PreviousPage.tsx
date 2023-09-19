import React from 'react';
import Button from './Button';
import { usePaginationContext } from '../context/PaginationProvider';

const PreviousPage = () => {
  const { pageInfo } = usePaginationContext();
  const onFirstPage = pageInfo.page === 0;

  return <Button type="PreviousPage" disabledCondition={onFirstPage} pageNumber={pageInfo.page - 1} />;
};

export default PreviousPage;

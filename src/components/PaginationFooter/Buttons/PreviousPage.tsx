import React from 'react';
import Button from './Button';
import { usePaginationContext } from '../context/PaginationProvider';
import { ButtonTypes } from '../types';

const PreviousPage = () => {
  const { pageInfo } = usePaginationContext();
  const onFirstPage = pageInfo.page === 0;

  return <Button type={ButtonTypes.PREVIOUS_PAGE} disabledCondition={onFirstPage} pageNumber={pageInfo.page - 1} />;
};

export default PreviousPage;

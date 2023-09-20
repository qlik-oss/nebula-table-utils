import React from 'react';
import Button from './Button';
import { usePaginationContext } from '../context/PaginationProvider';
import { ButtonTypes } from '../types';

const FirstPage = () => {
  const { pageInfo, width } = usePaginationContext();
  const onFirstPage = pageInfo.page === 0;

  if (width <= 350) {
    return null;
  }

  return <Button type={ButtonTypes.FIRST_PAGE} disabledCondition={onFirstPage} pageNumber={0} />;
};

export default FirstPage;

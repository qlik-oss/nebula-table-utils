import React from 'react';
import Button from './Button';
import { usePaginationContext } from '../context/PaginationProvider';

const FirstPage = () => {
  const { pageInfo, width } = usePaginationContext();
  const onFirstPage = pageInfo.page === 0;

  if (width <= 350) {
    return null;
  }

  return <Button type="FirstPage" disabledCondition={onFirstPage} pageNumber={0} />;
};

export default FirstPage;

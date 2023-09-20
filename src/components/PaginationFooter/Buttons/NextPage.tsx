import React from 'react';
import Button from './Button';
import { usePaginationContext } from '../context/PaginationProvider';
import handleLastTab from '../../../utils/handle-last-tab';
import { ButtonTypes } from '../types';

const NextPage = () => {
  const { pageInfo, keyboard, totalPages, isSelectionMode, width } = usePaginationContext();
  const onLastPage = pageInfo.page >= totalPages - 1;
  const showFirstAndLast = width > 350;

  const handleLastButtonTab =
    !showFirstAndLast && keyboard.enabled
      ? (event: React.KeyboardEvent) => handleLastTab(event, keyboard, isSelectionMode)
      : null;

  return (
    <Button
      type={ButtonTypes.NEXT_PAGE}
      disabledCondition={onLastPage}
      pageNumber={pageInfo.page + 1}
      onKeyDown={handleLastButtonTab}
    />
  );
};

export default NextPage;

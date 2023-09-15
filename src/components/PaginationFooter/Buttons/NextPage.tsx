import React from 'react';
import Button from './Button';
import { usePaginationContext } from '../PaginationProvider';
import handleLastTab from '../../../utils/handle-last-tab';

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
      type="NextPage"
      disabledCondition={onLastPage}
      pageNumber={pageInfo.page + 1}
      onKeyDown={handleLastButtonTab}
    />
  );
};

export default NextPage;

import React from 'react';
import Button from './Button';
import { usePaginationContext } from '../context/PaginationProvider';
import handleLastTab from '../../../utils/handle-last-tab';

const LastPage = () => {
  const { pageInfo, keyboard, totalPages, isSelectionMode, width } = usePaginationContext();
  const onLastPage = pageInfo.page >= totalPages - 1;

  if (width <= 350) {
    return null;
  }

  const handleLastButtonTab = keyboard.enabled
    ? (event: React.KeyboardEvent) => handleLastTab(event, keyboard, isSelectionMode)
    : null;

  return (
    <Button
      type="LastPage"
      disabledCondition={onLastPage}
      pageNumber={totalPages - 1}
      onKeyDown={handleLastButtonTab}
    />
  );
};

export default LastPage;

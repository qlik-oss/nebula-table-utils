import React from 'react';
import { usePaginationContext } from '../context/PaginationProvider';
import handleLastTab from '../../../utils/handle-last-tab';
import { ButtonTypes } from '../types';
import usePaginationButton from '../use-pagination-button';
import { StyledButton } from '../styles';
import { DEFAULT_FONT_SIZE } from '../../../constants';

const LastPage = () => {
  const { pageInfo, keyboard, totalPages, isSelectionMode, width } = usePaginationContext();
  const onLastPage = pageInfo.page >= totalPages - 1;
  const { IconComponent, styledProps } = usePaginationButton({
    type: ButtonTypes.LAST_PAGE,
    disabledCondition: onLastPage,
    pageNumber: totalPages - 1,
  });

  const handleLastButtonTab = keyboard.enabled
    ? (event: React.KeyboardEvent) => handleLastTab(event, keyboard, isSelectionMode)
    : null;

  if (width <= 350) {
    return null;
  }

  return (
    <StyledButton {...styledProps} onKeyDown={handleLastButtonTab}>
      <IconComponent height={DEFAULT_FONT_SIZE} />
    </StyledButton>
  );
};

export default LastPage;

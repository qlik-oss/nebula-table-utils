import React from 'react';
import { usePaginationContext } from '../context/PaginationProvider';
import handleLastTab from '../../../utils/handle-last-tab';
import { ButtonTypes } from '../types';
import usePaginationButton from '../use-pagination-button';
import { StyledButton } from '../styles';
import { DEFAULT_FONT_SIZE } from '../../../constants';

const NextPage = () => {
  const { pageInfo, keyboard, totalPages, isSelectionMode, width } = usePaginationContext();
  const onLastPage = pageInfo.page >= totalPages - 1;
  const { IconComponent, styledProps } = usePaginationButton({
    type: ButtonTypes.NEXT_PAGE,
    disabledCondition: onLastPage,
    pageNumber: pageInfo.page + 1,
  });

  const showFirstAndLast = width > 350;
  const handleLastButtonTab =
    !showFirstAndLast && keyboard.enabled
      ? (event: React.KeyboardEvent) => handleLastTab(event, keyboard, isSelectionMode)
      : null;

  return (
    <StyledButton {...styledProps} onKeyDown={handleLastButtonTab}>
      <IconComponent height={DEFAULT_FONT_SIZE} />
    </StyledButton>
  );
};

export default NextPage;

import React from 'react';
import { usePaginationContext } from '../context/PaginationProvider';
import { ButtonTypes } from '../types';
import usePaginationButton from '../use-pagination-button';
import { StyledButton } from '../styles';
import { DEFAULT_FONT_SIZE } from '../../../constants';

const PreviousPage = () => {
  const { pageInfo } = usePaginationContext();
  const onFirstPage = pageInfo.page === 0;
  const { IconComponent, styledProps } = usePaginationButton({
    type: ButtonTypes.PREVIOUS_PAGE,
    disabledCondition: onFirstPage,
    pageNumber: pageInfo.page - 1,
  });

  return (
    <StyledButton {...styledProps}>
      <IconComponent height={DEFAULT_FONT_SIZE} />
    </StyledButton>
  );
};

export default PreviousPage;

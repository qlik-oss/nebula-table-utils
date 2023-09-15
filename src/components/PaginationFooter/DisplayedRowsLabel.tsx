import React from 'react';
import { StyledTypography } from './styles';
import { usePaginationContext } from './PaginationProvider';

const DisplayedRowsLabel = () => {
  const { translator, width, pageInfo, totalRowCount } = usePaginationContext();
  const { page, rowsPerPage } = pageInfo;

  if (width <= 250) {
    return null;
  }

  const displayedRowsText = translator.get('SNTable.Pagination.DisplayedRowsLabel', [
    `${page * rowsPerPage + 1} - ${Math.min((page + 1) * rowsPerPage, totalRowCount)}`,
    totalRowCount.toString(),
  ]);

  return <StyledTypography variant="caption">{displayedRowsText}</StyledTypography>;
};

export default DisplayedRowsLabel;

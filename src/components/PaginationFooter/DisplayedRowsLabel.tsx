import React from 'react';
import { StyledTypography } from './styles';
import { usePaginationContext } from './context/PaginationProvider';
import { VisibilityThresholds } from './types';

const DisplayedRowsLabel = () => {
  const { translator, width, pageInfo, totalRowCount } = usePaginationContext();
  const { page, rowsPerPage } = pageInfo;

  if (width <= VisibilityThresholds.DisplayedRowsLabel) {
    return null;
  }

  const displayedRowsText = translator.get('NebulaTableUtils.Pagination.DisplayedRowsLabel', [
    `${page * rowsPerPage + 1} - ${Math.min((page + 1) * rowsPerPage, totalRowCount)}`,
    totalRowCount.toString(),
  ]);

  return <StyledTypography variant="caption">{displayedRowsText}</StyledTypography>;
};

export default DisplayedRowsLabel;

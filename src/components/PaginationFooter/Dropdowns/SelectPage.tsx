import React from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';
import PageOptions from './PageOptions';
import DropDown from './DropDown';
import { usePaginationContext } from '../context/PaginationProvider';
import { VisibilityThresholds } from '../types';

const SelectPage = () => {
  const { pageInfo, width, totalPages, handleChangePage } = usePaginationContext();
  const { page } = pageInfo;

  if (width <= VisibilityThresholds.SelectPage) {
    return null;
  }

  const handleSelectPage = (event: SelectChangeEvent<number>) => handleChangePage(+event.target.value);

  const pageOptions = <PageOptions totalPages={totalPages} page={page} />;

  return <DropDown name="SelectPage" value={page} options={pageOptions} handleChange={handleSelectPage} />;
};

export default SelectPage;

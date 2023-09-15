import React from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';
import DropDown from './DropDown';
import { usePaginationContext } from '../context/PaginationProvider';

const RowsPerPage = () => {
  const { pageInfo, isSelectionMode, totalColumnCount, width, setPageInfo, announce } = usePaginationContext();
  const showRowsPerPage =
    !!pageInfo.rowsPerPageOptions?.length && !isSelectionMode && width > 550 && totalColumnCount <= 100;

  if (!showRowsPerPage || pageInfo.rowsPerPageOptions === undefined) {
    return null;
  }

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    setPageInfo?.({ ...pageInfo, page: 0, rowsPerPage: +event.target.value });
    announce?.({
      keys: [['NebulaTableUtils.Pagination.RowsPerPageChange', event.target.value.toString()]],
      politeness: 'assertive',
    });
  };

  const rppOptions = (
    <>
      {pageInfo.rowsPerPageOptions.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </>
  );

  return (
    <DropDown
      name="RowsPerPage"
      value={pageInfo.rowsPerPage}
      options={rppOptions}
      handleChange={handleChangeRowsPerPage}
    />
  );
};

export default RowsPerPage;

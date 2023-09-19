import React from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';
import DropDown from './DropDown';
import { usePaginationContext } from '../context/PaginationProvider';

const RowsPerPage = () => {
  const { pageInfo, isSelectionMode, totalColumnCount, width, handleChangeRowsPerPage } = usePaginationContext();
  const showRowsPerPage =
    !!pageInfo.rowsPerPageOptions?.length && !isSelectionMode && width > 550 && totalColumnCount <= 100;

  if (!showRowsPerPage || pageInfo.rowsPerPageOptions === undefined) {
    return null;
  }

  const handleChange = (event: SelectChangeEvent<number>) => {
    handleChangeRowsPerPage?.(+event.target.value);
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

  return <DropDown name="RowsPerPage" value={pageInfo.rowsPerPage} options={rppOptions} handleChange={handleChange} />;
};

export default RowsPerPage;

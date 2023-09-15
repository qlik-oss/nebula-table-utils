import React, { memo } from 'react';
import type { PaginationContentProps } from './types';
import PaginationProvider from './context/PaginationProvider';
import DisplayedRowsLabel from './DisplayedRowsLabel';
import RowsPerPage from './Dropdowns/RowsPerPage';
import SelectPage from './Dropdowns/SelectPage';
import FirstPage from './Buttons/FirstPage';
import PreviousPage from './Buttons/PreviousPage';
import NextPage from './Buttons/NextPage';
import LastPage from './Buttons/LastPage';

const PaginationContent = (props: PaginationContentProps) => (
  <PaginationProvider {...props}>
    <RowsPerPage />
    <SelectPage />
    <DisplayedRowsLabel />
    <FirstPage />
    <PreviousPage />
    <NextPage />
    <LastPage />
  </PaginationProvider>
);

export default memo(PaginationContent);

import React from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';
import { usePaginationContext } from '../PaginationProvider';
import { StyledSelect, StyledTypography } from '../styles';

interface Props {
  name: string;
  value: number;
  options: JSX.Element;
  handleChange: (event: SelectChangeEvent<number>) => void;
}

const DropDown = ({ name, value, options, handleChange }: Props) => {
  const { layout, footerStyle, translator, tabIndex } = usePaginationContext();
  const chartId = layout.qInfo.qId as string;
  const label = translator.get(`SNTable.Pagination.${name}`);
  const id = `${name}-dropdown`;
  const labelId = `${id}-label-${chartId}`;
  const inputProps = {
    tabIndex,
    id,
    'data-testid': id,
    'aria-labelledby': labelId,
  };

  return (
    <>
      <StyledTypography variant="caption" id={labelId}>
        {label}:
      </StyledTypography>
      <StyledSelect
        footerStyle={footerStyle}
        size="small"
        native
        value={value}
        onChange={handleChange}
        inputProps={inputProps}
      >
        {options}
      </StyledSelect>
    </>
  );
};

export default DropDown;

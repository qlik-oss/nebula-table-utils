import React from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';
import { usePaginationContext } from '../context/PaginationProvider';
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
  const label = translator.get(`NebulaTableUtils.Pagination.${name}`);
  const baseId = `${name}-dropdown`;
  const labelId = `${baseId}-label-${chartId}`;
  const id = `${baseId}-${chartId}`;
  const inputProps = {
    tabIndex,
    id,
    'data-testid': baseId,
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

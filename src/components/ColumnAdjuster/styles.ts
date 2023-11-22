import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { COLUMN_ADJUSTER_BORDER_CLASS } from '../../constants';

type ShouldForwardProp = string | number | symbol;

const CELL_PADDING = 4;
const GRID_BORDER = 1;

export const AdjusterHitArea = styled(Box, {
  shouldForwardProp: (prop: ShouldForwardProp) => prop !== 'isLastColumn' && prop !== 'borderColor',
})(({ isLastColumn, borderColor }) => ({
  pointerEvents: 'auto',
  touchAction: 'none',
  display: 'flex',
  position: 'absolute',
  height: '100%',
  top: 0,
  cursor: 'col-resize',
  // last column padding, other double padding + border
  width: `${isLastColumn ? CELL_PADDING : CELL_PADDING * 2 + GRID_BORDER}px`,
  justifyContent: isLastColumn ? 'flex-end' : 'center',
  marginLeft: '-4px',
  '&:hover:not(:focus, :active)': {
    [`& .${COLUMN_ADJUSTER_BORDER_CLASS}`]: {
      background: borderColor || '#D9D9D9',
      '@media (hover: none)': {
        background: 'none',
      },
    },
  },
  '&:focus-visible, :active': {
    outline: 'none',
    [`& .${COLUMN_ADJUSTER_BORDER_CLASS}`]: {
      background: '#177fe6',
      borderLeft: '1px solid #fff',
      borderRight: !isLastColumn ? '1px solid #fff' : undefined,
    },
  },
}));

export const AdjusterBorder = styled(Box)({
  position: 'absolute',
  height: '100%',
  width: '3px',
});

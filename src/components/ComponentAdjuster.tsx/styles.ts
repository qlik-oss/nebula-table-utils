import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { CELL_PADDING, COLUMN_ADJUSTER_BORDER_CLASS, DOUBLE_CELL_PADDING, GRID_BORDER } from './constants';

type ShouldForwardProp = string | number | symbol;

export const AdjusterHitArea = styled(Box, {
  shouldForwardProp: (prop: ShouldForwardProp) => prop !== 'isLastColumn',
})(({ isLastColumn }) => ({
  PointerEvent: 'all',
  touchAction: 'none',
  display: 'flex',
  position: 'absolute',
  height: '100%',
  top: 0,
  left: `100%`,
  cursor: 'col-resize',
  // last column padding, other double padding + border
  width: `${isLastColumn ? CELL_PADDING : DOUBLE_CELL_PADDING + GRID_BORDER}px`,
  justifyContent: isLastColumn ? 'flex-end' : 'center',
  marginLeft: '-4px',
  '&:hover:not(:focus, :active)': {
    [`& .${COLUMN_ADJUSTER_BORDER_CLASS}`]: {
      background: '#D9D9D9',
      '@media (hover: none)': {
        background: 'none',
      },
    },
  },
  '&:focus-visible, :active': {
    outline: 'none',
    [`& .${COLUMN_ADJUSTER_BORDER_CLASS}`]: {
      background: '#177fe6',
    },
  },
}));

export const AdjusterBorder = styled(Box)({
  position: 'absolute',
  height: '100%',
  width: '3px',
});

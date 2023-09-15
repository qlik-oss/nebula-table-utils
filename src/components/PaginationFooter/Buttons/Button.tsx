import React from 'react';
import ArrowLeft from '@qlik-trial/sprout/icons/react/ArrowLeft';
import ArrowLeftStop from '@qlik-trial/sprout/icons/react/ArrowLeftStop';
import ArrowRight from '@qlik-trial/sprout/icons/react/ArrowRight';
import ArrowRightStop from '@qlik-trial/sprout/icons/react/ArrowRightStop';
import { StyledButton } from '../styles';
import { DEFAULT_FONT_SIZE } from '../../../constants';
import { usePaginationContext } from '../PaginationProvider';

interface Props {
  disabledCondition: boolean;
  pageNumber: number;
  type: string;
  onKeyDown?: ((event: React.KeyboardEvent) => void) | null;
  show?: boolean;
}

const ICONS: Record<string, typeof ArrowLeft> = {
  FirstPage: ArrowLeftStop,
  PreviousPage: ArrowLeft,
  NextPage: ArrowRight,
  LastPage: ArrowRightStop,
  FirstPageRTL: ArrowRightStop,
  PreviousPageRTL: ArrowRight,
  NextPageRTL: ArrowLeft,
  LastPageRTL: ArrowLeftStop,
};

const Button = ({ disabledCondition, pageNumber, type, onKeyDown, show }: Props) => {
  const { direction, footerStyle, handleChangePage, translator, interactions, tabIndex } = usePaginationContext();

  if (show === false) {
    return null;
  }

  const iconType = `${type}${direction === 'rtl' ? 'RTL' : ''}`;
  const IconComponent = ICONS[iconType];

  return (
    <StyledButton
      footerStyle={footerStyle}
      disabledCondition={disabledCondition}
      size="small"
      data-testid="pagination-action-icon-button"
      onClick={!disabledCondition ? () => handleChangePage(pageNumber) : null}
      aria-disabled={disabledCondition}
      aria-label={translator.get(`SNTable.Pagination.${type}`)}
      title={interactions.passive ? translator.get(`SNTable.Pagination.${type}`) : undefined}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
    >
      <IconComponent height={DEFAULT_FONT_SIZE} />
    </StyledButton>
  );
};

export default Button;

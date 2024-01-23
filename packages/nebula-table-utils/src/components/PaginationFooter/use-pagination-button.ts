import React from 'react';
import ArrowLeft from '@qlik-trial/sprout/icons/react/ArrowLeft';
import ArrowLeftStop from '@qlik-trial/sprout/icons/react/ArrowLeftStop';
import ArrowRight from '@qlik-trial/sprout/icons/react/ArrowRight';
import ArrowRightStop from '@qlik-trial/sprout/icons/react/ArrowRightStop';
import { usePaginationContext } from './context/PaginationProvider';

interface Props {
  disabledCondition: boolean;
  pageNumber: number;
  type: string;
  onKeyDown?: ((event: React.KeyboardEvent) => void) | null;
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

const usePaginationButton = ({ disabledCondition, pageNumber, type }: Props) => {
  const { direction, footerStyle, handleChangePage, translator, interactions, tabIndex } = usePaginationContext();
  const iconType = `${type}${direction === 'rtl' ? 'RTL' : ''}`;
  const IconComponent = ICONS[iconType];

  return {
    styledProps: {
      footerStyle,
      disabledCondition,
      size: 'small',
      'data-testid': 'pagination-action-icon-button',
      'aria-disabled': disabledCondition,
      'aria-label': translator.get(`NebulaTableUtils.Pagination.${type}`),
      title: interactions.passive ? translator.get(`NebulaTableUtils.Pagination.${type}`) : undefined,
      tabIndex,
      onClick: !disabledCondition ? () => handleChangePage(pageNumber) : null,
    },
    IconComponent,
  };
};

export default usePaginationButton;

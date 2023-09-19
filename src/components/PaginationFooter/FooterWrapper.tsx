import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { StyledFooterWrapper } from './styles';
import type { FooterWrapperProps } from './types';
import getFooterStyle from './utils';

const FooterWrapper = ({
  children,
  footerContainer,
  interactions,
  theme,
  paginationNeeded = true,
}: FooterWrapperProps) => {
  const footerStyle = useMemo(() => getFooterStyle(theme.background), [theme]);

  if (!interactions.active) {
    return null;
  }

  const pagination = paginationNeeded ? (
    <StyledFooterWrapper footerStyle={footerStyle}>{children}</StyledFooterWrapper>
  ) : null;

  // footerContainer allows the paginationNeeded to be overriden
  return footerContainer ? ReactDOM.createPortal(children, footerContainer) : pagination;
};

export default FooterWrapper;

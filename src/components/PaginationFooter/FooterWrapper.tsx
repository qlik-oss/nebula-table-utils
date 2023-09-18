import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { StyledFooterWrapper } from './styles';
import type { FooterWrapperProps } from './types';
import getFooterStyle from './utils';

export default function FooterWrapper({
  children,
  footerContainer,
  paginationNeeded = true,
  theme,
}: FooterWrapperProps) {
  const footerStyle = useMemo(() => getFooterStyle(theme.background), [theme]);

  const pagination = paginationNeeded ? (
    <StyledFooterWrapper footerStyle={footerStyle}>{children}</StyledFooterWrapper>
  ) : null;

  return footerContainer ? ReactDOM.createPortal(children, footerContainer) : pagination;
}

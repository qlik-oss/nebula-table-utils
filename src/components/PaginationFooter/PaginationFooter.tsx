import React from 'react';
import FooterWrapper from './FooterWrapper';
import PaginationContent from './PaginationContent';
import type { FooterWrapperProps, PaginationContentProps } from './types';

interface Props extends Omit<FooterWrapperProps, 'children'>, PaginationContentProps {}

const PaginationFooter = (props: Props) => {
  return (
    <FooterWrapper {...props}>
      <PaginationContent {...props} />
    </FooterWrapper>
  );
};

export default PaginationFooter;

import React, { createContext, useContext, useMemo } from 'react';
import type { stardust } from '@nebula.js/stardust';
import type { FooterStyle, PaginationContentProps } from '../types';
import getFooterStyle from '../utils';
import useTranslations from '../../../hooks/useTranslations';

interface IPaginationProvider extends PaginationContentProps {
  footerStyle: FooterStyle;
  tabIndex: number;
  width: number;
}

interface PaginationProviderProps extends PaginationContentProps {
  children: React.ReactNode;
}

export const areTabStopsEnabled = (keyboard: stardust.Keyboard) => !keyboard.enabled || keyboard.active;

const NOOP = {} as IPaginationProvider;

const PaginationProviderContext = createContext<IPaginationProvider>(NOOP);

export const usePaginationContext = (): IPaginationProvider => useContext(PaginationProviderContext);

const PaginationProvider = ({
  children,
  direction,
  pageInfo,
  setPageInfo,
  footerContainer,
  isSelectionMode,
  handleChangePage,
  announce,
  totalRowCount,
  totalColumnCount,
  totalPages,
  keyboard,
  translator,
  theme,
  interactions,
  rect,
  layout,
}: PaginationProviderProps): JSX.Element => {
  // The elements can be focused in sequential keyboard navigation:
  // - When nebula handles keyboard navigation
  // and focus is somewhere inside the extension, or
  // - When nebula does not handle keyboard navigation
  const tabIndex = areTabStopsEnabled(keyboard) ? 0 : -1;
  const footerStyle = useMemo(() => getFooterStyle(theme.background), [theme]);
  const width = footerContainer ? footerContainer.getBoundingClientRect().width : rect.width;
  const t = useTranslations({ translator });

  const value = useMemo(
    () => ({
      direction,
      pageInfo,
      setPageInfo,
      footerContainer,
      isSelectionMode,
      handleChangePage,
      announce,
      totalRowCount,
      totalColumnCount,
      totalPages,
      keyboard,
      translator: t,
      theme,
      interactions,
      rect,
      layout,
      footerStyle,
      tabIndex,
      width,
    }),
    [
      direction,
      pageInfo,
      setPageInfo,
      footerContainer,
      isSelectionMode,
      handleChangePage,
      announce,
      totalRowCount,
      totalColumnCount,
      totalPages,
      keyboard,
      t,
      theme,
      interactions,
      rect,
      layout,
      footerStyle,
      tabIndex,
      width,
    ]
  );

  return <PaginationProviderContext.Provider value={value}>{children}</PaginationProviderContext.Provider>;
};

export default PaginationProvider;

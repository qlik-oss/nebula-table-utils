import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import RecursiveMenuList from '../RecursiveMenuList';
import * as MenuGroupWrapper from '../MenuGroupWrapper';
import { MenuItemGroup } from '../../types';

jest.mock('../MenuGroupWrapper', () => ({
  __esModule: true,
  ...jest.requireActual('../MenuGroupWrapper'),
}));

describe('<RecursiveMenuList />', () => {
  let menuGroups: MenuItemGroup[];
  let menuGroupWrapperMock: jest.Mock<any, any>;
  let anchorEl: HTMLDivElement;
  let handleHeadCellMenuKeyDownMock: jest.Mock<() => void>;

  beforeEach(() => {
    anchorEl = document.createElement('div');
    menuGroupWrapperMock = jest.fn();
    handleHeadCellMenuKeyDownMock = jest.fn();
    jest.spyOn(MenuGroupWrapper, 'default').mockImplementation(menuGroupWrapperMock);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should call `MenuGroupWrapper` with proper arguments', () => {
    menuGroups = [
      [{ items: [{ id: 1, icon: () => <i />, itemTitle: 'Menu#01', enabled: true }] }],
      [{ items: [{ id: 2, icon: () => <i />, itemTitle: 'Menu#02', enabled: true }] }],
    ];
    render(
      <RecursiveMenuList
        open
        anchorEl={anchorEl}
        onClose={() => {}}
        menuGroups={menuGroups}
        handleHeadCellMenuKeyDown={handleHeadCellMenuKeyDownMock}
      />
    );

    expect(menuGroupWrapperMock).toHaveBeenCalledTimes(1);
    expect(menuGroupWrapperMock).toHaveBeenCalledWith(expect.objectContaining({ itemGroups: menuGroups }));
  });

  test('should not call `MenuGroupWrapper` when there are no menuGroups', () => {
    menuGroups = [];
    render(
      <RecursiveMenuList
        open
        anchorEl={anchorEl}
        onClose={() => {}}
        menuGroups={menuGroups}
        handleHeadCellMenuKeyDown={handleHeadCellMenuKeyDownMock}
      />
    );

    expect(menuGroupWrapperMock).toHaveBeenCalledTimes(0);
  });
});

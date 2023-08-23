import React from 'react';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import MenuGroupWrapper from '../MenuGroupWrapper';
import type { MenuItemGroup } from '../../types';

describe('<MenuGroupWrapper />', () => {
  const renderer = (itemGroups: MenuItemGroup[]) => {
    // @ts-expect-error calling like component here for test, but it's being called as function where it's been used
    render(<MenuGroupWrapper itemGroups={itemGroups} />);
  };

  test('should render menu group without divider', () => {
    renderer([[{ items: [{ id: 1, icon: () => <i />, itemTitle: 'Menu#01', enabled: true }] }]]);
    expect(screen.queryByText('Menu#01')).toBeVisible();
    expect(screen.queryByTestId('group-divider')).not.toBeInTheDocument();
  });

  test('should render menu group with divider', () => {
    renderer([
      [{ items: [{ id: 1, icon: () => <i />, itemTitle: 'Menu#01', enabled: true }] }],
      [{ items: [{ id: 2, icon: () => <i />, itemTitle: 'Menu#02', enabled: true }] }],
    ]);
    expect(screen.queryByText('Menu#01')).toBeVisible();
    expect(screen.queryByText('Menu#02')).toBeVisible();
    expect(screen.getByTestId('group-divider')).toBeVisible();
  });
});

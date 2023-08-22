import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import MenuGroup, { interceptClickOnMenuItems } from '../MenuGroup';
import { MenuItemGroup } from '../../types';

describe('MenuGroup', () => {
  describe('interceptClickOnMenuItems', () => {
    let menuGroups: MenuItemGroup[];
    let cache: Record<string, any>;

    test('should return proper values per menu', () => {
      menuGroups = [
        [{ items: [{ id: 1, icon: () => <i />, itemTitle: 'Menu#01', enabled: true }] }],
        [{ items: [{ id: 2, icon: () => <i />, itemTitle: 'Menu#02', enabled: true }] }],
      ];
      expect(interceptClickOnMenuItems(menuGroups, cache)).toMatchObject(menuGroups);
    });

    test('should include onClick property if it was provided', () => {
      menuGroups = [
        [{ items: [{ id: 1, icon: () => <i />, enabled: true, itemTitle: 'Menu#01', onClick: () => {} }] }],
      ];
      const res = interceptClickOnMenuItems(menuGroups, cache);
      expect(res[0][0].items[0].onClick).toBeTruthy;
    });

    test('should include subMenus property if it was provided', () => {
      menuGroups = [
        [
          {
            items: [
              {
                id: 1,
                icon: () => <i />,
                itemTitle: 'SubMenu#01',
                enabled: true,
                subMenus: [[{ items: [{ id: 5, icon: () => <i />, itemTitle: 'SubMenu#01', enabled: true }] }]],
              },
            ],
          },
        ],
      ];
      expect(interceptClickOnMenuItems(menuGroups, cache)).toMatchObject(menuGroups);
    });
  });

  describe('<MenuGroup />', () => {
    let menuGroup: MenuItemGroup;
    let mockHandleHeadCellMenuKeyDown: jest.Mock<() => void>;

    beforeEach(() => {
      mockHandleHeadCellMenuKeyDown = jest.fn();
    });

    const renderer = (group: MenuItemGroup) => {
      return render(<MenuGroup menuGroup={group} handleHeadCellMenuKeyDown={mockHandleHeadCellMenuKeyDown} />);
    };

    test('should render menu items', () => {
      menuGroup = [
        {
          groupHeading: 'SomeHeading',
          items: [
            { id: 1, icon: () => <i />, itemTitle: 'Menu#01', enabled: true },
            { id: 2, icon: () => <i />, itemTitle: 'Menu#02', enabled: true },
          ],
        },
      ] as MenuItemGroup;
      renderer(menuGroup);

      expect(screen.getByText('Menu#01')).toBeVisible();
      expect(screen.getByText('Menu#02')).toBeVisible();
    });

    test('should render menu items with subMenu', () => {
      menuGroup = [
        {
          groupHeading: 'SomeHeading',
          items: [
            { id: 1, icon: () => <i />, itemTitle: 'Menu#01', enabled: true },
            {
              id: 2,
              icon: () => <i />,
              itemTitle: 'Menu#02',
              enabled: true,
              subMenus: [
                [
                  {
                    items: [
                      { id: 3, icon: () => <i />, itemTitle: 'SubMenu#01', enabled: true },
                      { id: 4, icon: () => <i />, itemTitle: 'SubMenu#02', enabled: true },
                    ],
                  },
                ],
                [{ items: [{ id: 5, icon: () => <i />, itemTitle: 'SubMenu#03', enabled: true }] }],
              ],
            },
          ],
        },
      ];
      renderer(menuGroup);

      expect(screen.getByText('Menu#01')).toBeVisible();
      expect(screen.getByText('Menu#02')).toBeVisible();

      fireEvent.click(screen.getByTestId('menu-item-2'));

      expect(screen.getByText('SubMenu#01')).toBeVisible();
      expect(screen.getByText('SubMenu#02')).toBeVisible();
      expect(screen.getByText('SubMenu#03')).toBeVisible();
    });
  });
});

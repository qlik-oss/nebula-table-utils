/* eslint jest/no-standalone-expect: 0, array-callback-return: 0 */
import { stardust } from '@nebula.js/stardust';
import { fireEvent } from '@testing-library/react';
import { Column, MenuAvailabilityFlags } from '../types';
import { GetMenuItemGroupsArgs, getMenuItemGroups } from '../utils';

describe('Utils', () => {
  let column: Column;
  let translator: stardust.Translator;
  let translatorGetMock: jest.Mock<() => string>;
  let menuAvailabilityFlags: Partial<Record<MenuAvailabilityFlags, boolean>>;
  let setOpenMenuDropdown: jest.Mock<() => void>;

  // sort
  let sortFromMenu: jest.Mock<() => void>;
  let changeActivelySortedColumn: jest.Mock<() => void>;

  // search
  let interactions: stardust.Interactions;
  let embedListbox: jest.Mock<() => void>;

  // selection
  let fieldInstance: EngineAPI.IField | null;
  let selectionActionsEnabledStatus: Record<string, boolean>;

  // adjust col size
  let anchorRef: React.RefObject<HTMLDivElement>;
  let setFocusOnClosetColumnAdjuster: jest.Mock<() => void>;

  let getMenuItemArgs = {} as GetMenuItemGroupsArgs;

  beforeEach(() => {
    column = {
      isActivelySorted: false,
      sortDirection: 'A',
      isDim: false,
    } as Column;
    translatorGetMock = jest.fn().mockImplementation((s) => s);
    translator = {
      get: translatorGetMock,
    } as unknown as stardust.Translator;
    menuAvailabilityFlags = {};
    setOpenMenuDropdown = jest.fn();
    sortFromMenu = jest.fn();
    changeActivelySortedColumn = jest.fn();
    interactions = { select: false };
    embedListbox = jest.fn();
    fieldInstance = {
      selectAll: jest.fn(),
      selectPossible: jest.fn(),
      selectAlternative: jest.fn(),
      selectExcluded: jest.fn(),
      clear: jest.fn(),
    } as unknown as EngineAPI.IField;
    selectionActionsEnabledStatus = {
      canSelectAll: true,
      canSelectPossible: true,
      canSelectAlternative: true,
      canSelectExcluded: true,
      canClearSelections: true,
    };
    anchorRef = {
      anchorName: 'anchor-from-test',
    } as unknown as React.RefObject<HTMLDivElement>;
    setFocusOnClosetColumnAdjuster = jest.fn();

    getMenuItemArgs = {
      column,
      translator,
      menuAvailabilityFlags,
      setOpenMenuDropdown,

      // sort
      sortFromMenu,
      changeActivelySortedColumn,

      // search
      interactions,
      embedListbox,

      // selection
      fieldInstance,
      selectionActionsEnabledStatus,

      // Adjust col size
      anchorRef,
      setFocusOnClosetColumnAdjuster,
    };
  });

  describe('Structure check', () => {
    const getMenuExpactation = (hasTitle = true) =>
      expect.arrayContaining([
        expect.arrayContaining([
          expect.objectContaining({
            ...(hasTitle ? { groupHeading: expect.any(String) } : {}),
            items: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                itemTitle: expect.any(String),
                onClick: expect.any(Function),
                icon: expect.any(Function),
                enabled: expect.any(Boolean),
                isActive: expect.any(Boolean),
              }),
            ]),
          }),
        ]),
      ]);

    test('should have correct structure with One Group (only Sorting)', () => {
      getMenuItemArgs = {
        ...getMenuItemArgs,
        menuAvailabilityFlags: { ...getMenuItemArgs.menuAvailabilityFlags, sorting: true },
      };
      expect(getMenuItemGroups(getMenuItemArgs)).toMatchObject(getMenuExpactation());
    });

    test('should have correct structure with multiple Groups (Sort and Search)', () => {
      getMenuItemArgs = {
        ...getMenuItemArgs,
        menuAvailabilityFlags: { ...getMenuItemArgs.menuAvailabilityFlags, sorting: true, searching: true },
      };
      expect(getMenuItemGroups(getMenuItemArgs)).toMatchObject(getMenuExpactation());
    });

    test('should include subMenus if provided', () => {
      getMenuItemArgs = {
        ...getMenuItemArgs,
        column: { ...getMenuItemArgs.column, isDim: true },
        interactions: { select: true },
        menuAvailabilityFlags: { ...getMenuItemArgs.menuAvailabilityFlags, selections: true },
      };
      const result = getMenuItemGroups(getMenuItemArgs);
      expect(result[0][0].items[0].subMenus).toMatchObject(getMenuExpactation(false));
    });
  });

  describe('Flags', () => {
    test('should include all items based on provided flags', () => {
      getMenuItemArgs = {
        ...getMenuItemArgs,
        column: { ...getMenuItemArgs.column, isDim: true },
        interactions: { select: true },
        menuAvailabilityFlags: {
          ...getMenuItemArgs.menuAvailabilityFlags,
          sorting: true,
          searching: true,
          selections: true,
          adjustColumnSize: true,
        },
      };
      const result = getMenuItemGroups(getMenuItemArgs);
      expect(result.length).toBe(4);
    });
  });

  describe('Callbacks', () => {
    const evt = fireEvent.click(document.createElement('DIV')) as unknown as React.MouseEvent<
      HTMLLIElement,
      MouseEvent
    >;

    describe('Sorting', () => {
      afterEach(() => {
        expect(setOpenMenuDropdown).toHaveBeenCalledTimes(1);
        expect(setOpenMenuDropdown).toHaveBeenCalledWith(false);
      });

      test('should call expected functions on sort ASC callback', () => {
        getMenuItemArgs = {
          ...getMenuItemArgs,
          menuAvailabilityFlags: {
            ...getMenuItemArgs.menuAvailabilityFlags,
            sorting: true,
          },
        };
        const result = getMenuItemGroups(getMenuItemArgs);

        const callback = result[0][0].items[0].onClick;

        callback?.(evt);
        expect(sortFromMenu).toHaveBeenCalledTimes(1);
        expect(changeActivelySortedColumn).toHaveBeenCalledTimes(1);
        expect(sortFromMenu).toHaveBeenCalledWith(evt, 'A');
        expect(changeActivelySortedColumn).toHaveBeenCalledWith(column);
      });

      test('should call expected functions on sort DESC callback', () => {
        getMenuItemArgs = {
          ...getMenuItemArgs,
          menuAvailabilityFlags: {
            ...getMenuItemArgs.menuAvailabilityFlags,
            sorting: true,
          },
        };
        const result = getMenuItemGroups(getMenuItemArgs);
        const callback = result[0][0].items[1].onClick;

        callback?.(evt);
        expect(sortFromMenu).toHaveBeenCalledTimes(1);
        expect(changeActivelySortedColumn).toHaveBeenCalledTimes(1);
        expect(sortFromMenu).toHaveBeenCalledWith(evt, 'D');
        expect(changeActivelySortedColumn).toHaveBeenCalledWith(column);
      });
    });

    describe('Searching', () => {
      afterEach(() => {
        expect(setOpenMenuDropdown).toHaveBeenCalledTimes(1);
        expect(setOpenMenuDropdown).toHaveBeenCalledWith(false);
      });

      test('should call expected functions on Search callback', () => {
        const stopPropagationMock = jest.fn();
        const mockedEvt = { ...evt, stopPropagation: stopPropagationMock };
        getMenuItemArgs = {
          ...getMenuItemArgs,
          column: { ...getMenuItemArgs.column, isDim: true },
          interactions: { select: true },
          menuAvailabilityFlags: {
            ...getMenuItemArgs.menuAvailabilityFlags,
            searching: true,
          },
        };
        const result = getMenuItemGroups(getMenuItemArgs);

        const callback = result[0][0].items[0].onClick;
        callback?.(mockedEvt);

        expect(stopPropagationMock).toHaveBeenCalledTimes(1);
        expect(embedListbox).toHaveBeenCalledTimes(1);
        expect(embedListbox).toHaveBeenLastCalledWith();
      });
    });

    describe('Selections', () => {
      afterEach(() => {
        expect(setOpenMenuDropdown).toHaveBeenCalledTimes(5);
        expect(setOpenMenuDropdown).toHaveBeenCalledWith(false);
      });
      test('should call expected functions on Selections callback', () => {
        getMenuItemArgs = {
          ...getMenuItemArgs,
          column: { ...getMenuItemArgs.column, isDim: true },
          interactions: { select: true },
          menuAvailabilityFlags: {
            ...getMenuItemArgs.menuAvailabilityFlags,
            selections: true,
          },
        };
        const result = getMenuItemGroups(getMenuItemArgs);

        result[0][0].items[0].subMenus?.forEach((menuGroup) => {
          menuGroup.map((grp) => {
            grp.items.map((selectionItemData) => {
              // pluck out callback name from it's translation
              let callbackFnName = selectionItemData.itemTitle.split('.').at(-1) || '';
              callbackFnName = callbackFnName[0].toLocaleLowerCase() + callbackFnName.slice(1);
              if (callbackFnName?.includes('clear')) callbackFnName = 'clear';

              const callback = selectionItemData.onClick;
              callback?.(evt);
              // @ts-expect-error no need to check as we are getting the functiin name dynamically in string format
              expect(fieldInstance?.[callbackFnName]).toHaveBeenCalledTimes(1);
            });
          });
        });
      });
    });

    describe('Adjust Col Size', () => {
      afterEach(() => {
        expect(setOpenMenuDropdown).toHaveBeenCalledTimes(1);
        expect(setOpenMenuDropdown).toHaveBeenCalledWith(false);
      });

      test('should call expected functions on Adjust Col Size callback', () => {
        const stopPropagationMock = jest.fn();
        const preventDefaultMock = jest.fn();
        const mockedEvt = { ...evt, stopPropagation: stopPropagationMock, preventDefault: preventDefaultMock };
        getMenuItemArgs = {
          ...getMenuItemArgs,
          menuAvailabilityFlags: {
            ...getMenuItemArgs.menuAvailabilityFlags,
            adjustColumnSize: true,
          },
        };
        const result = getMenuItemGroups(getMenuItemArgs);

        const callback = result[0][0].items[0].onClick;
        callback?.(mockedEvt);

        expect(stopPropagationMock).toHaveBeenCalledTimes(1);
        expect(preventDefaultMock).toHaveBeenCalledTimes(1);
        expect(setFocusOnClosetColumnAdjuster).toHaveBeenCalledTimes(1);
        expect(setFocusOnClosetColumnAdjuster).toHaveBeenCalledWith(anchorRef);
      });
    });
  });
});

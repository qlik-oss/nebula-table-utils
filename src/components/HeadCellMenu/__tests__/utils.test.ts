/* eslint jest/no-standalone-expect: 0, array-callback-return: 0 */
import { stardust } from '@nebula.js/stardust';
import type { HeaderData, MenuAvailabilityFlags } from '../types';
import { type GetMenuItemGroupsArgs, getMenuItemGroups } from '../utils';

describe('Utils', () => {
  let headerData: HeaderData;
  let translator: stardust.Translator;
  let translatorGetMock: jest.Mock<() => string>;
  let menuAvailabilityFlags: Partial<Record<MenuAvailabilityFlags, boolean>>;
  let setOpen: jest.Mock<() => void>;

  // sort
  let sortFromMenu: jest.Mock<Promise<void>>;
  let changeActivelySortedHeader: jest.Mock<Promise<boolean>>;

  // search
  let interactions: stardust.Interactions;
  let embedListbox: jest.Mock<() => void>;

  // selection
  let fieldInstance: EngineAPI.IField | null;
  let selectionActionsEnabledStatus: Record<string, boolean>;

  // adjust col size
  let anchorRef: React.RefObject<HTMLDivElement>;
  let setFocusOnClosetHeaderAdjuster: jest.Mock<() => void>;

  let getMenuItemArgs = {} as GetMenuItemGroupsArgs;

  beforeEach(() => {
    headerData = {
      isActivelySorted: false,
      sortDirection: 'A',
      isDim: false,
    } as HeaderData;
    translatorGetMock = jest.fn().mockImplementation((s) => s);
    translator = {
      get: translatorGetMock,
    } as unknown as stardust.Translator;
    menuAvailabilityFlags = {};
    setOpen = jest.fn();
    sortFromMenu = jest.fn();
    changeActivelySortedHeader = jest.fn();
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
    setFocusOnClosetHeaderAdjuster = jest.fn();

    getMenuItemArgs = {
      headerData,
      translator,
      menuAvailabilityFlags,
      setOpen,

      // sort
      sortFromMenu,
      changeActivelySortedHeader,

      // search
      interactions,
      embedListbox,

      // selection
      fieldInstance,
      selectionActionsEnabledStatus,

      // Adjust col size
      anchorRef,
      setFocusOnClosetHeaderAdjuster,
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Structure check', () => {
    const getMenuExpactation = (hasTitle = true, isSubMenu = false) =>
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
                ...(!isSubMenu ? { isActive: expect.any(Boolean) } : {}),
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
        headerData: { ...getMenuItemArgs.headerData, isDim: true },
        interactions: { select: true },
        menuAvailabilityFlags: { ...getMenuItemArgs.menuAvailabilityFlags, selections: true },
      };
      const result = getMenuItemGroups(getMenuItemArgs);
      expect(result[0][0].items[0].subMenus).toMatchObject(getMenuExpactation(false, true));
    });
  });

  describe('Flags', () => {
    test('should include all items based on provided flags', () => {
      getMenuItemArgs = {
        ...getMenuItemArgs,
        headerData: { ...getMenuItemArgs.headerData, isDim: true },
        interactions: { select: true },
        menuAvailabilityFlags: {
          ...getMenuItemArgs.menuAvailabilityFlags,
          sorting: true,
          searching: true,
          selections: true,
          adjustHeaderSize: true,
        },
      };
      const result = getMenuItemGroups(getMenuItemArgs);
      expect(result).toHaveLength(4);
    });
  });

  describe('Callbacks', () => {
    const evt = new MouseEvent('click') as unknown as React.MouseEvent<HTMLLIElement>;

    describe('Sorting', () => {
      afterEach(() => {
        expect(setOpen).toHaveBeenCalledTimes(1);
        expect(setOpen).toHaveBeenCalledWith(false);
      });

      test('should call expected functions on sort ASC callback', async () => {
        getMenuItemArgs = {
          ...getMenuItemArgs,
          menuAvailabilityFlags: {
            ...getMenuItemArgs.menuAvailabilityFlags,
            sorting: true,
          },
        };
        const result = getMenuItemGroups(getMenuItemArgs);

        const callback = result[0][0].items[0].onClick;

        await callback?.(evt);
        expect(sortFromMenu).toHaveBeenCalledTimes(1);
        expect(changeActivelySortedHeader).toHaveBeenCalledTimes(1);
        expect(sortFromMenu).toHaveBeenCalledWith(evt, 'A');
        expect(changeActivelySortedHeader).toHaveBeenCalledWith(headerData);
      });

      test('should call expected functions on sort DESC callback', async () => {
        getMenuItemArgs = {
          ...getMenuItemArgs,
          menuAvailabilityFlags: {
            ...getMenuItemArgs.menuAvailabilityFlags,
            sorting: true,
          },
        };
        const result = getMenuItemGroups(getMenuItemArgs);
        const callback = result[0][0].items[1].onClick;

        await callback?.(evt);
        expect(sortFromMenu).toHaveBeenCalledTimes(1);
        expect(changeActivelySortedHeader).toHaveBeenCalledTimes(1);
        expect(sortFromMenu).toHaveBeenCalledWith(evt, 'D');
        expect(changeActivelySortedHeader).toHaveBeenCalledWith(headerData);
      });
    });

    describe('Searching', () => {
      afterEach(() => {
        expect(setOpen).toHaveBeenCalledTimes(1);
        expect(setOpen).toHaveBeenCalledWith(false);
      });

      test('should call expected functions on Search callback', async () => {
        const stopPropagationMock = jest.fn();
        const mockedEvt = { ...evt, stopPropagation: stopPropagationMock };
        getMenuItemArgs = {
          ...getMenuItemArgs,
          headerData: { ...getMenuItemArgs.headerData, isDim: true },
          interactions: { select: true },
          menuAvailabilityFlags: {
            ...getMenuItemArgs.menuAvailabilityFlags,
            searching: true,
          },
        };
        const result = getMenuItemGroups(getMenuItemArgs);

        const callback = result[0][0].items[0].onClick;
        await callback?.(mockedEvt);

        expect(stopPropagationMock).toHaveBeenCalledTimes(1);
        expect(embedListbox).toHaveBeenCalledTimes(1);
        expect(embedListbox).toHaveBeenLastCalledWith();
      });
    });

    describe('Selections', () => {
      afterEach(() => {
        expect(setOpen).toHaveBeenCalledTimes(5);
        expect(setOpen).toHaveBeenCalledWith(false);
      });
      test('should call expected functions on Selections callback', () => {
        getMenuItemArgs = {
          ...getMenuItemArgs,
          headerData: { ...getMenuItemArgs.headerData, isDim: true },
          interactions: { select: true },
          menuAvailabilityFlags: {
            ...getMenuItemArgs.menuAvailabilityFlags,
            selections: true,
          },
        };
        const result = getMenuItemGroups(getMenuItemArgs);

        result[0][0].items[0].subMenus?.forEach((menuGroup) => {
          menuGroup.map((grp) => {
            grp.items.map(async (selectionItemData) => {
              // pluck out callback name from it's translation
              let callbackFnName = selectionItemData.itemTitle.split('.').at(-1) || '';
              callbackFnName = callbackFnName[0].toLocaleLowerCase() + callbackFnName.slice(1);
              if (callbackFnName?.includes('clear')) callbackFnName = 'clear';

              const callback = selectionItemData.onClick;
              await callback?.(evt);
              // @ts-expect-error no need to check as we are getting the functiin name dynamically in string format
              expect(fieldInstance?.[callbackFnName]).toHaveBeenCalledTimes(1);
            });
          });
        });
      });
    });

    describe('Adjust Col Size', () => {
      afterEach(() => {
        expect(setOpen).toHaveBeenCalledTimes(1);
        expect(setOpen).toHaveBeenCalledWith(false);
      });

      test('should call expected functions on Adjust Col Size callback', async () => {
        const stopPropagationMock = jest.fn();
        const preventDefaultMock = jest.fn();
        const mockedEvt = { ...evt, stopPropagation: stopPropagationMock, preventDefault: preventDefaultMock };
        getMenuItemArgs = {
          ...getMenuItemArgs,
          menuAvailabilityFlags: {
            ...getMenuItemArgs.menuAvailabilityFlags,
            adjustHeaderSize: true,
          },
        };
        const result = getMenuItemGroups(getMenuItemArgs);

        const callback = result[0][0].items[0].onClick;
        await callback?.(mockedEvt);

        expect(stopPropagationMock).toHaveBeenCalledTimes(1);
        expect(preventDefaultMock).toHaveBeenCalledTimes(1);
        expect(setFocusOnClosetHeaderAdjuster).toHaveBeenCalledTimes(1);
        expect(setFocusOnClosetHeaderAdjuster).toHaveBeenCalledWith(anchorRef);
      });
    });
  });
});

import { stardust } from '@nebula.js/stardust';
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
    translatorGetMock = jest.fn();
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

  describe('Sorting Group', () => {
    test('should have correct data structure', () => {
      getMenuItemArgs = {
        ...getMenuItemArgs,
        menuAvailabilityFlags: {
          ...getMenuItemArgs.menuAvailabilityFlags,
          sorting: true,
        },
      };
      const result = getMenuItemGroups(getMenuItemArgs);
      console.log(JSON.stringify(result, null, 2));
      expect(result).toMatchObject([
        [
          expect.objectContaining({
            groupHeading: expect.any(String),
            items: expect.objectContaining([
              expect.objectContaining({
                id: expect.any(Number),
                enabled: expect.any(Boolean),
                isActive: expect.any(Boolean),
              }),
            ]),
          }),
        ],
      ]);
    });
  });
});

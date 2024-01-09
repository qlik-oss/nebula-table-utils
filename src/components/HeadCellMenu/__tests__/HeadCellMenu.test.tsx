/* eslint-disable no-underscore-dangle */
import React from 'react';
import '@testing-library/jest-dom';
import { stardust } from '@nebula.js/stardust';
import { render, fireEvent, screen } from '@testing-library/react';
import HeadCellMenu from '../HeadCellMenu';
import * as useFieldSelectionHook from '../use-field-selection';
import { type HeaderData, MenuAvailabilityFlags, type UseFieldSelectionOutput } from '../types';
import { HEAD_CELL_MENU_BUTTON_CLASS } from '../../../constants';

jest.mock('../use-field-selection', () => ({
  __esModule: true,
  ...jest.requireActual('../use-field-selection'),
}));

type ExtendedEmbed = stardust.Embed & {
  __DO_NOT_USE__: {
    popover: () => void;
  };
  on: () => void;
};

describe('<HeadCellMenu />', () => {
  let app: EngineAPI.IApp;
  let headerData: HeaderData;
  let translator: stardust.Translator;
  let translatorGetMock: jest.Mock<() => string>;
  let menuAvailabilityFlags: Partial<Record<MenuAvailabilityFlags, boolean>>;
  let sortFromMenu: jest.Mock<Promise<void>>;
  let changeActivelySortedHeader: jest.Mock<Promise<boolean>>;
  let interactions: stardust.Interactions;
  let anchorRef: React.RefObject<HTMLDivElement>;
  let setFocusOnClosetHeaderAdjuster: jest.Mock<() => void>;
  let listboxRef: React.RefObject<HTMLDivElement>;
  let handleHeadCellMenuKeyDown: jest.Mock<() => void>;
  let open: boolean;
  let setOpenMock: jest.Mock<() => void>;
  let shouldShowMenuIcon: boolean;

  let embed: ExtendedEmbed;
  let defaultListboxAnchorOpts: any;
  let fieldInstanceMock: EngineAPI.IField;
  let selectionActionsEnabledStatusMock: Record<string, boolean>;
  let resetSelectionActionsEnabledStatusMock: jest.Mock<any, any>;
  let updateSelectionActionsEnabledStatusMock: jest.Mock<any, any>;
  let model: EngineAPI.IGenericObject;
  let useFieldSelectionHookResult: UseFieldSelectionOutput;
  const menuLabels = [
    'NebulaTableUtils.MenuItemLabel.Search',
    'NebulaTableUtils.MenuItemLabel.SelectAll',
    'NebulaTableUtils.MenuItemLabel.SelectPossible',
    'NebulaTableUtils.MenuItemLabel.SelectAlternative',
    'NebulaTableUtils.MenuItemLabel.SelectExcluded',
    'NebulaTableUtils.MenuItemLabel.ClearSelections',
  ];

  const renderTableHeadCellMenu = () =>
    render(
      <HeadCellMenu
        translator={translator}
        anchorRef={anchorRef}
        headerData={headerData}
        interactions={interactions}
        menuAvailabilityFlags={menuAvailabilityFlags}
        handleHeadCellMenuKeyDown={handleHeadCellMenuKeyDown}
        sortRelatedArgs={{ sortFromMenu, changeActivelySortedHeader }}
        searchRelatedArgs={{ embed, listboxRef }}
        selectionRelatedArgs={{ app, model }}
        adjustHeaderSizeRelatedArgs={{ setFocusOnClosetHeaderAdjuster }}
        open={open}
        setOpen={setOpenMock}
        shouldShowMenuIcon={shouldShowMenuIcon}
      />
    );

  beforeEach(() => {
    embed = {
      field: jest.fn().mockResolvedValueOnce({ mount: jest.fn(), unmount: jest.fn() }),
      render: jest.fn(),
      create: jest.fn(),
      generateProperties: jest.fn(),
      selections: jest.fn(),
      context: jest.fn(),
      getRegisteredTypes: jest.fn(),
      __DO_NOT_USE__: {
        popover: jest.fn(),
      },
      on: jest.fn(),
    };
    headerData = {
      colIdx: 0,
      isDim: true,
      label: 'dim#01',
      fieldId: 'someFieldId',
    } as HeaderData;
    defaultListboxAnchorOpts = {
      anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
      transformOrigin: { horizontal: 'left', vertical: 'top' },
    };
    anchorRef = { current: document.createElement('DIV') as HTMLDivElement };
    listboxRef = { current: document.createElement('DIV') as HTMLDivElement };
    translatorGetMock = jest.fn().mockImplementation((s) => s);
    translator = {
      get: translatorGetMock,
    } as unknown as stardust.Translator;
    fieldInstanceMock = {
      selectAll: jest.fn(),
      clear: jest.fn(),
      selectPossible: jest.fn(),
      selectAlternative: jest.fn(),
      selectExcluded: jest.fn(),
    } as unknown as EngineAPI.IField;
    selectionActionsEnabledStatusMock = {
      canSelectAll: true,
      canClearSelections: false,
      canSelectPossible: true,
      canSelectAlternative: false,
      canSelectExcluded: false,
    };
    resetSelectionActionsEnabledStatusMock = jest.fn();
    updateSelectionActionsEnabledStatusMock = jest.fn();
    useFieldSelectionHookResult = {
      fieldInstance: fieldInstanceMock,
      selectionActionsEnabledStatus: selectionActionsEnabledStatusMock,
      resetSelectionActionsEnabledStatus: resetSelectionActionsEnabledStatusMock,
      updateSelectionActionsEnabledStatus: updateSelectionActionsEnabledStatusMock,
    };
    jest.spyOn(useFieldSelectionHook, 'default').mockReturnValue(useFieldSelectionHookResult);
    model = {
      getLayout: jest.fn().mockResolvedValue(null),
    } as unknown as EngineAPI.IGenericObject;
    interactions = {
      select: true,
      active: true,
    };
    menuAvailabilityFlags = {
      sorting: true,
      searching: true,
      selections: true,
      adjustHeaderSize: true,
    };
    open = true;
    setOpenMock = jest.fn();
    shouldShowMenuIcon = true;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render all menu items', () => {
    renderTableHeadCellMenu();

    [
      'NebulaTableUtils.MenuGroupLabel.Sorting',
      'NebulaTableUtils.MenuItemLabel.SortAscending',
      'NebulaTableUtils.MenuItemLabel.SortDescending',
      'NebulaTableUtils.MenuItemLabel.Search',
      'NebulaTableUtils.MenuItemLabel.Selections',
      'NebulaTableUtils.MenuItemLabel.AdjustColumnSize',
    ].forEach((actionLabel) => {
      expect(screen.queryByText(actionLabel)).toBeInTheDocument();
    });
  });

  test('should not render if interactions.active is false', () => {
    interactions = { ...interactions, active: false };
    renderTableHeadCellMenu();

    [
      'NebulaTableUtils.MenuGroupLabel.Sorting',
      'NebulaTableUtils.MenuItemLabel.SortAscending',
      'NebulaTableUtils.MenuItemLabel.SortDescending',
      'NebulaTableUtils.MenuItemLabel.Search',
      'NebulaTableUtils.MenuItemLabel.Selections',
      'NebulaTableUtils.MenuItemLabel.AdjustColumnSize',
    ].forEach((actionLabel) => {
      expect(screen.queryByText(actionLabel)).not.toBeInTheDocument();
    });
  });

  test('should render Menu icon if `shouldShowMenuIcon` by default', () => {
    renderTableHeadCellMenu();

    expect(screen.queryByTestId(HEAD_CELL_MENU_BUTTON_CLASS)).toBeInTheDocument();
  });

  test('should not render Menu icon if `shouldShowMenuIcon` is false', () => {
    shouldShowMenuIcon = false;
    renderTableHeadCellMenu();

    expect(screen.queryByTestId(HEAD_CELL_MENU_BUTTON_CLASS)).not.toBeInTheDocument();
  });

  test('should not render Search and selections when interactions are false', () => {
    interactions.select = false;
    renderTableHeadCellMenu();

    expect(screen.queryByText('NebulaTableUtils.MenuItemLabel.Search')).toBeNull();
    expect(screen.queryByText('NebulaTableUtils.MenuItemLabel.Selections')).toBeNull();
  });

  test('should close the menu when listbox is about to mount', () => {
    renderTableHeadCellMenu();

    fireEvent.click(screen.getByText('NebulaTableUtils.MenuItemLabel.Search'));
    expect(setOpenMock).toHaveBeenCalledTimes(1);
    expect(setOpenMock).toHaveBeenCalledWith(false);
  });

  test('should call `embed.__DO_NOT_USE__.popover()` once while trying to open listbox filter for a dimension', () => {
    renderTableHeadCellMenu();

    fireEvent.click(screen.getByText('NebulaTableUtils.MenuItemLabel.Search'));
    expect(embed.__DO_NOT_USE__.popover).toHaveBeenCalledTimes(1);
    expect(embed.__DO_NOT_USE__.popover).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      headerData.fieldId,
      defaultListboxAnchorOpts
    );
  });

  test('should call `embed.__DO_NOT_USE__.popover()` once while trying to open listbox filter for a master dimension', () => {
    headerData = {
      ...headerData,
      qLibraryId: 'someLibId',
    };
    renderTableHeadCellMenu();

    fireEvent.click(screen.getByText('NebulaTableUtils.MenuItemLabel.Search'));
    expect(embed.__DO_NOT_USE__.popover).toHaveBeenCalledTimes(1);
    expect(embed.__DO_NOT_USE__.popover).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      { qLibraryId: headerData.qLibraryId, type: 'dimension' },
      defaultListboxAnchorOpts
    );
  });

  test('should reflect correct `enabled` status of selection actions based', () => {
    renderTableHeadCellMenu();

    fireEvent.click(screen.getByText('NebulaTableUtils.MenuItemLabel.Selections'));
    menuLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeVisible();
    });

    // enabled actions based on mocked values
    ['NebulaTableUtils.MenuItemLabel.SelectAll', 'NebulaTableUtils.MenuItemLabel.SelectPossible'].forEach(
      (actionLabel) => {
        expect(screen.queryByText(actionLabel)?.closest('li')).not.toHaveAttribute('aria-disabled');
      }
    );

    // disabled actions based on mocked values
    [
      'NebulaTableUtils.MenuItemLabel.SelectAlternative',
      'NebulaTableUtils.MenuItemLabel.SelectExcluded',
      'NebulaTableUtils.MenuItemLabel.ClearSelections',
    ].forEach((actionLabel) => {
      expect(screen.queryByText(actionLabel)?.closest('li')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Selection actions', () => {
    const handleBeforeEachAction = (targetAction: string) => {
      jest.spyOn(useFieldSelectionHook, 'default').mockReturnValue({
        ...useFieldSelectionHookResult,
        selectionActionsEnabledStatus: {
          ...useFieldSelectionHookResult.selectionActionsEnabledStatus,
          [`can${targetAction}`]: true,
        },
      });
      renderTableHeadCellMenu();
      fireEvent.click(screen.getByText('NebulaTableUtils.MenuItemLabel.Selections'));
      fireEvent.click(screen.getByText(`NebulaTableUtils.MenuItemLabel.${targetAction}`));
    };

    test('should be able to call "Select All" once when it is enabled', () => {
      handleBeforeEachAction('SelectAll');
      expect(fieldInstanceMock.selectAll).toHaveBeenCalledTimes(1);
    });

    test('should be able to call "Clear Selection" all once when it is enabled', () => {
      handleBeforeEachAction('ClearSelections');
      expect(fieldInstanceMock.clear).toHaveBeenCalledTimes(1);
    });

    test('should be able to call "Select Possible" all once when it is enabled', () => {
      handleBeforeEachAction('SelectPossible');
      expect(fieldInstanceMock.selectPossible).toHaveBeenCalledTimes(1);
    });

    test('should be able to call "Select Alternative" all once when it is enabled', () => {
      handleBeforeEachAction('SelectAlternative');
      expect(fieldInstanceMock.selectAlternative).toHaveBeenCalledTimes(1);
    });

    test('should be able to call "Select Excluded" all once when it is enabled', () => {
      handleBeforeEachAction('SelectExcluded');
      expect(fieldInstanceMock.selectExcluded).toHaveBeenCalledTimes(1);
    });
  });
});

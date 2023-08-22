/* eslint-disable no-underscore-dangle */
import React from 'react';
import '@testing-library/jest-dom';
import { stardust } from '@nebula.js/stardust';
import { render, fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import HeadCellMenu from '../HeadCellMenu';
import * as useFieldSelectionHook from '../use-field-selection';
import { HeaderData, MenuAvailabilityFlags, UseFieldSelectionOutput } from '../types';

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

  let embed: ExtendedEmbed;
  let defaultListboxAnchorOpts: any;
  let fieldInstanceMock: EngineAPI.IField;
  let selectionActionsEnabledStatusMock: Record<string, boolean>;
  let resetSelectionActionsEnabledStatusMock: jest.Mock<any, any>;
  let updateSelectionActionsEnabledStatusMock: jest.Mock<any, any>;
  let model: EngineAPI.IGenericObject;
  let useFieldSelectionHookResult: UseFieldSelectionOutput;
  const menuLabels = [
    'SNTable.MenuItem.Search',
    'SNTable.MenuItem.SelectAll',
    'SNTable.MenuItem.SelectPossible',
    'SNTable.MenuItem.SelectAlternative',
    'SNTable.MenuItem.SelectExcluded',
    'SNTable.MenuItem.ClearSelections',
  ];

  const renderTableHeadCellMenu = () =>
    render(
      <HeadCellMenu
        translator={translator}
        anchorRef={anchorRef}
        headerData={headerData}
        tabIndex={0}
        menuAvailabilityFlags={menuAvailabilityFlags}
        handleHeadCellMenuKeyDown={handleHeadCellMenuKeyDown}
        sortRelatedArgs={{ sortFromMenu, changeActivelySortedHeader }}
        searchRelatedArgs={{ embed, listboxRef, interactions }}
        selectionRelatedArgs={{ app, model }}
        adjustHeaderSizeRelatedArgs={{ setFocusOnClosetHeaderAdjuster }}
      />
    );

  const openMenu = async () => {
    fireEvent.click(screen.getByTestId('nebula-table-utils-head-menu-button'));
    await waitFor(() => {
      expect(screen.queryByRole('menu')).toBeVisible();
    });
  };

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
    };
    menuAvailabilityFlags = {
      sorting: true,
      searching: true,
      selections: true,
      adjustHeaderSize: true,
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should open menu and render all menu items', async () => {
    renderTableHeadCellMenu();
    await openMenu();

    [
      'Sorting',
      'SNTable.MenuItem.SortAscending',
      'SNTable.MenuItem.SortDescending',
      'SNTable.MenuItem.Search',
      'SNTable.MenuItem.Selections',
      'SNTable.MenuItem.AdjustColumnSize',
    ].forEach((actionLabel) => {
      expect(screen.queryByText(actionLabel)).toBeInTheDocument();
    });
  });

  test('should not render Search and selections when interactions are false', async () => {
    interactions.select = false;
    renderTableHeadCellMenu();
    await openMenu();

    expect(screen.queryByText('SNTable.MenuItem.Search')).toBeNull();
    expect(screen.queryByText('SNTable.MenuItem.Selections')).toBeNull();
  });

  test('should close the menu when listbox is about to mount', async () => {
    renderTableHeadCellMenu();
    await openMenu();

    fireEvent.click(screen.getByText('SNTable.MenuItem.Search'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  test('should close the menu by clicking the menu button when the context menu is open', async () => {
    renderTableHeadCellMenu();

    const button = screen.getByTestId('nebula-table-utils-head-menu-button');
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.queryByRole('menu')).toBeInTheDocument();
    });
    fireEvent.click(button);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    // it's called 2 times:
    // 1. default state is false
    // 2. when we actually close the dropdown
    expect(resetSelectionActionsEnabledStatusMock).toHaveBeenCalledTimes(2);
  });

  test('should call `embed.__DO_NOT_USE__.popover()` once while trying to open listbox filter for a dimension', async () => {
    renderTableHeadCellMenu();
    await openMenu();

    // fireEvent.click(screen.getByRole('button'));
    // await waitFor(() => {
    //   expect(screen.queryByRole('menu')).toBeVisible();
    // });
    fireEvent.click(screen.getByText('SNTable.MenuItem.Search'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(embed.__DO_NOT_USE__.popover).toHaveBeenCalledTimes(1);
    expect(embed.__DO_NOT_USE__.popover).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      headerData.fieldId,
      defaultListboxAnchorOpts
    );
  });

  test('should call `embed.__DO_NOT_USE__.popover()` once while trying to open listbox filter for a master dimension', async () => {
    headerData = {
      ...headerData,
      qLibraryId: 'someLibId',
    };
    renderTableHeadCellMenu();
    await openMenu();

    await waitFor(() => {
      expect(screen.queryByRole('menu')).toBeVisible();
    });
    fireEvent.click(screen.getByText('SNTable.MenuItem.Search'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(embed.__DO_NOT_USE__.popover).toHaveBeenCalledTimes(1);
    expect(embed.__DO_NOT_USE__.popover).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      { qLibraryId: headerData.qLibraryId, type: 'dimension' },
      defaultListboxAnchorOpts
    );
  });

  test('should reflect correct `enabled` status of selection actions based', async () => {
    renderTableHeadCellMenu();
    await openMenu();

    await waitFor(() => {
      expect(screen.queryByRole('menu')).toBeVisible();
    });
    fireEvent.click(screen.getByText('SNTable.MenuItem.Selections'));
    menuLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeVisible();
    });

    // enabled actions based on mocked values
    ['SNTable.MenuItem.SelectAll', 'SNTable.MenuItem.SelectPossible'].forEach((actionLabel) => {
      expect(screen.queryByText(actionLabel)?.closest('li')).not.toHaveAttribute('aria-disabled');
    });

    // disabled actions based on mocked values
    [
      'SNTable.MenuItem.SelectAlternative',
      'SNTable.MenuItem.SelectExcluded',
      'SNTable.MenuItem.ClearSelections',
    ].forEach((actionLabel) => {
      expect(screen.queryByText(actionLabel)?.closest('li')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Selection actions', () => {
    const handleBeforeEachAction = async (targetAction: string) => {
      jest.spyOn(useFieldSelectionHook, 'default').mockReturnValue({
        ...useFieldSelectionHookResult,
        selectionActionsEnabledStatus: {
          ...useFieldSelectionHookResult.selectionActionsEnabledStatus,
          [`can${targetAction}`]: true,
        },
      });
      renderTableHeadCellMenu();
      await openMenu();
      await waitFor(() => {
        expect(screen.queryByRole('menu')).toBeVisible();
      });
      fireEvent.click(screen.getByText('SNTable.MenuItem.Selections'));
      fireEvent.click(screen.getByText(`SNTable.MenuItem.${targetAction}`));
    };

    const testEnd = async () => {
      expect(updateSelectionActionsEnabledStatusMock).toHaveBeenCalledTimes(1);
      fireEvent.click(document);
      await waitForElementToBeRemoved(() => screen.queryByRole('menu'));
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    };

    test('should be able to call "Select All" once when it is enabled', async () => {
      await handleBeforeEachAction('SelectAll');
      expect(fieldInstanceMock.selectAll).toHaveBeenCalledTimes(1);
      await testEnd();
    });

    test('should be able to call "Clear Selection" all once when it is enabled', async () => {
      await handleBeforeEachAction('ClearSelections');
      expect(fieldInstanceMock.clear).toHaveBeenCalledTimes(1);
      await testEnd();
    });

    test('should be able to call "Select Possible" all once when it is enabled', async () => {
      await handleBeforeEachAction('SelectPossible');
      expect(fieldInstanceMock.selectPossible).toHaveBeenCalledTimes(1);
      await testEnd();
    });

    test('should be able to call "Select Alternative" all once when it is enabled', async () => {
      await handleBeforeEachAction('SelectAlternative');
      expect(fieldInstanceMock.selectAlternative).toHaveBeenCalledTimes(1);
      await testEnd();
    });

    test('should be able to call "Select Excluded" all once when it is enabled', async () => {
      await handleBeforeEachAction('SelectExcluded');
      expect(fieldInstanceMock.selectExcluded).toHaveBeenCalledTimes(1);
      await testEnd();
    });
  });
});

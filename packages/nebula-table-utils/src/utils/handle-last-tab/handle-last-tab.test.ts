import { stardust } from '@nebula.js/stardust';
import handleLastTab from '.';
import { KeyCodes } from '../../constants';
import focusSelectionToolbar from '../focus-selection-toolbar';

jest.mock('../focus-selection-toolbar', () => jest.fn());

describe('handleLastTab', () => {
  let evt: React.KeyboardEvent;
  let isSelectionMode: boolean;
  const keyboard = {} as unknown as stardust.Keyboard;

  beforeEach(() => {
    evt = {
      key: KeyCodes.TAB,
      shiftKey: false,
      target: {} as HTMLElement,
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent;
    isSelectionMode = true;
    jest.resetAllMocks();
  });

  it('should call focusSelectionToolbar when isSelectionMode is true and tab is pressed', () => {
    handleLastTab(evt, keyboard, isSelectionMode);

    expect(evt.stopPropagation).toHaveBeenCalledTimes(1);
    expect(evt.preventDefault).toHaveBeenCalledTimes(1);
    expect(focusSelectionToolbar).toHaveBeenCalledTimes(1);
  });

  it('should not call focusSelectionToolbar when isSelectionMode is false', () => {
    isSelectionMode = false;
    handleLastTab(evt, keyboard, isSelectionMode);

    expect(evt.stopPropagation).not.toHaveBeenCalled();
    expect(evt.preventDefault).not.toHaveBeenCalled();
    expect(focusSelectionToolbar).not.toHaveBeenCalled();
  });

  it('should not call focusSelectionToolbar when key is not tab', () => {
    evt.key = 'someKey';
    handleLastTab(evt, keyboard, isSelectionMode);

    expect(evt.stopPropagation).not.toHaveBeenCalled();
    expect(evt.preventDefault).not.toHaveBeenCalled();
    expect(focusSelectionToolbar).not.toHaveBeenCalled();
  });

  it('should not call focusSelectionToolbar when shift+tab is pressed', () => {
    evt.shiftKey = true;
    handleLastTab(evt, keyboard, isSelectionMode);

    expect(evt.stopPropagation).not.toHaveBeenCalled();
    expect(evt.preventDefault).not.toHaveBeenCalled();
    expect(focusSelectionToolbar).not.toHaveBeenCalled();
  });
});

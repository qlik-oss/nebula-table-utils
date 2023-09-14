import type { stardust } from '@nebula.js/stardust';
import { KeyCodes } from '../constants';

export const preventDefaultBehavior = (evt: React.KeyboardEvent | MouseEvent | React.MouseEvent<HTMLLIElement>) => {
  evt.stopPropagation();
  evt.preventDefault();
};

/**
 * Sets focus to button in the selection toolbar, handles both client and nebula toolbar
 */
export const focusSelectionToolbar = (element: HTMLElement, keyboard: stardust.Keyboard, last: boolean) => {
  const clientConfirmButton =
    element.closest('.qv-object-wrapper')?.querySelector('.sel-toolbar-confirm')?.parentElement ??
    document.querySelector('#qv-selection-toolbar-popover .sel-toolbar-confirm')?.parentElement;
  if (clientConfirmButton) {
    clientConfirmButton.focus();
    return;
  }
  keyboard.focusSelection?.(last);
};

const handleLastTab = (evt: React.KeyboardEvent, keyboard: stardust.Keyboard, isSelectionMode = false) => {
  if (isSelectionMode && evt.key === KeyCodes.TAB && !evt.shiftKey) {
    // tab key: focus on the selection toolbar
    preventDefaultBehavior(evt);
    focusSelectionToolbar(evt.target as HTMLElement, keyboard, false);
  }
};

export default handleLastTab;

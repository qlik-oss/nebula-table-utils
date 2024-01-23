import type { stardust } from '@nebula.js/stardust';

/**
 * Sets focus to button in the selection toolbar, handles both client and nebula toolbar
 */
const focusSelectionToolbar = (element: HTMLElement, keyboard: stardust.Keyboard, last: boolean) => {
  const clientConfirmButton =
    element.closest('.qv-object-wrapper')?.querySelector('.sel-toolbar-confirm')?.parentElement ??
    document.querySelector('#qv-selection-toolbar-popover .sel-toolbar-confirm')?.parentElement;

  if (clientConfirmButton) {
    clientConfirmButton.focus();
    return;
  }

  keyboard.focusSelection?.(last);
};

export default focusSelectionToolbar;

import { stardust } from '@nebula.js/stardust';
import focusSelectionToolbar from '.';

describe('focusSelectionToolbar', () => {
  let element: HTMLElement;
  let parentElement: HTMLElement | null;
  let parentElementFromDocument: HTMLElement | null;
  let last: boolean;
  let keyboard: stardust.Keyboard;

  beforeEach(() => {
    parentElement = { focus: jest.fn() } as unknown as HTMLElement;
    parentElementFromDocument = { focus: jest.fn() } as unknown as HTMLElement;
    element = {
      closest: () => ({ querySelector: () => ({ parentElement }) }),
    } as unknown as HTMLElement;
    jest
      .spyOn(document, 'querySelector')
      .mockImplementation(() => ({ parentElement: parentElementFromDocument }) as unknown as Element);
    last = false;

    keyboard = {
      blur: jest.fn(),
      focus: jest.fn(),
      focusSelection: jest.fn(),
      enabled: true,
      active: false,
    } as unknown as stardust.Keyboard;
  });

  it('should call parentElement.focus when clientConfirmButton exists in object', () => {
    focusSelectionToolbar(element, keyboard, last);
    expect(parentElement?.focus).toHaveBeenCalledTimes(1);
    expect(keyboard.focusSelection).not.toHaveBeenCalled();
  });

  it('should call parentElement.focus when clientConfirmButton does not exists in object, but in the document', () => {
    parentElement = null;
    focusSelectionToolbar(element, keyboard, last);
    expect(parentElementFromDocument?.focus).toHaveBeenCalledTimes(1);
    expect(keyboard.focusSelection).not.toHaveBeenCalled();
  });

  it("should call keyboard.focusSelection when clientConfirmButton doesn't exist", () => {
    parentElement = null;
    parentElementFromDocument = null;
    focusSelectionToolbar(element, keyboard, last);
    expect(keyboard.focusSelection).toHaveBeenCalledWith(false);
  });
});

import { renderHook, act, waitFor } from '@testing-library/react';
import useFieldSelection from '../use-field-selection';
import { Column } from '../types';

describe('useFieldSelection()', () => {
  let column: Column;
  let appMock: EngineAPI.IApp;

  const getFieldSelectionResult = () => renderHook(() => useFieldSelection({ column, app: appMock }));

  beforeEach(() => {
    column = {
      isDim: true,
      fieldId: 'dim#01',
      label: 'dim#01',
    } as Column;
    appMock = {
      getField: jest.fn().mockResolvedValue(null),
      createSessionObject: jest.fn().mockResolvedValue({}),
    } as unknown as EngineAPI.IApp;
  });

  test('should return default state', () => {
    const {
      result: { current: output },
    } = getFieldSelectionResult();

    expect(output).toMatchObject({
      fieldInstance: null,
      selectionActionsEnabledStatus: {
        canSelectAll: false,
        canClearSelections: false,
        canSelectPossible: false,
        canSelectAlternative: false,
        canSelectExcluded: false,
      },
      resetSelectionActionsEnabledStatus: expect.any(Function),
      updateSelectionActionsEnabledStatus: expect.any(Function),
    });
  });

  describe('enabledStates', () => {
    const triggerHook = (qStateCounts: EngineAPI.INxStateCounts, qFallbackTitle = 'dim#01') => {
      const { result } = getFieldSelectionResult();
      const mockLayout = {
        qHyperCube: { qDimensionInfo: [{ qFallbackTitle, qStateCounts }] },
      } as EngineAPI.IGenericHyperCubeLayout;
      act(() => result.current.updateSelectionActionsEnabledStatus(mockLayout));
      return result.current.selectionActionsEnabledStatus;
    };

    test('should return if it could not find dim after calling `updateSelectionActionsEnabledStatus` with anything', () => {
      const state = { qOption: 1, qAlternative: 1, qDeselected: 1 } as EngineAPI.INxStateCounts;
      expect(triggerHook(state, 'someRandomDim')).toMatchObject({
        canSelectAll: false,
        canClearSelections: false,
        canSelectPossible: false,
        canSelectAlternative: false,
        canSelectExcluded: false,
      });
      expect(appMock.getField).toHaveBeenCalled();
    });

    test('`canSelectAll` and `canSelectPossible` and should be true after calling `updateSelectionActionsEnabledStatus` with `qOptions`', async () => {
      const state = { qOption: 1 } as EngineAPI.INxStateCounts;
      await waitFor(() => {
        expect(triggerHook(state)).toMatchObject({
          canSelectAll: true,
          canClearSelections: false,
          canSelectPossible: true,
          canSelectAlternative: false,
          canSelectExcluded: false,
        });
      });
    });

    test('`canSelectAll`, `canSelectAlternative` and `canSelectExcluded` should be true after calling `updateSelectionActionsEnabledStatus` with `qAlternative`', async () => {
      const state = { qAlternative: 1 } as EngineAPI.INxStateCounts;
      await waitFor(() => {
        expect(triggerHook(state)).toMatchObject({
          canSelectAll: true,
          canClearSelections: false,
          canSelectPossible: false,
          canSelectAlternative: true,
          canSelectExcluded: true,
        });
      });
    });

    test('`canSelectAll` should be true after calling `updateSelectionActionsEnabledStatus` with `qDeselected`', async () => {
      const state = { qDeselected: 1 } as EngineAPI.INxStateCounts;
      await waitFor(() => {
        expect(triggerHook(state)).toMatchObject({
          canSelectAll: true,
          canClearSelections: false,
          canSelectPossible: false,
          canSelectAlternative: false,
          canSelectExcluded: false,
        });
      });
    });

    test('`canClearSelections` should be true after calling `updateSelectionActionsEnabledStatus` with `qSelected`', async () => {
      const state = { qSelected: 1 } as EngineAPI.INxStateCounts;
      await waitFor(() => {
        expect(triggerHook(state)).toMatchObject({
          canSelectAll: false,
          canClearSelections: true,
          canSelectPossible: false,
          canSelectAlternative: false,
          canSelectExcluded: false,
        });
      });
    });

    test('`canSelectAll` and `canSelectPossible` should be true after calling `updateSelectionActionsEnabledStatus` with `qOption`', async () => {
      const state = { qOption: 1 } as EngineAPI.INxStateCounts;
      await waitFor(() => {
        expect(triggerHook(state)).toMatchObject({
          canSelectAll: true,
          canClearSelections: false,
          canSelectPossible: true,
          canSelectAlternative: false,
          canSelectExcluded: false,
        });
      });
    });

    test('`canSelectAll`, `canSelectAlternative` and `canSelectExcluded` should be true after calling `updateSelectionActionsEnabledStatus` with `qAlternative`2', async () => {
      const state = { qAlternative: 1 } as EngineAPI.INxStateCounts;
      await waitFor(() => {
        expect(triggerHook(state)).toMatchObject({
          canSelectAll: true,
          canClearSelections: false,
          canSelectPossible: false,
          canSelectAlternative: true,
          canSelectExcluded: true,
        });
      });
    });

    test('`canSelectAll` and `canSelectExcluded` should be true after calling `updateSelectionActionsEnabledStatus` with `qExcluded`', async () => {
      const state = { qExcluded: 1 } as EngineAPI.INxStateCounts;
      await waitFor(() => {
        expect(triggerHook(state)).toMatchObject({
          canSelectAll: true,
          canClearSelections: false,
          canSelectPossible: false,
          canSelectAlternative: false,
          canSelectExcluded: true,
        });
      });
    });

    test('should reset state after calling `resetSelectionActionsEnabledStatus`', async () => {
      const { result } = getFieldSelectionResult();
      const mockLayout = {
        qHyperCube: {
          qDimensionInfo: [{ qFallbackTitle: 'dim#01', qStateCounts: { qExcluded: 1 } }],
        },
      } as EngineAPI.IGenericHyperCubeLayout;
      act(() => result.current.updateSelectionActionsEnabledStatus(mockLayout));

      await waitFor(() => {
        expect(result.current.selectionActionsEnabledStatus).toMatchObject({
          canSelectAll: true,
          canClearSelections: false,
          canSelectPossible: false,
          canSelectAlternative: false,
          canSelectExcluded: true,
        });
      });

      act(() => result.current.resetSelectionActionsEnabledStatus());

      await waitFor(() => {
        expect(result.current.selectionActionsEnabledStatus).toMatchObject({
          canSelectAll: false,
          canClearSelections: false,
          canSelectPossible: false,
          canSelectAlternative: false,
          canSelectExcluded: false,
        });
      });
    });
  });
});

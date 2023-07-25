import { useState, useEffect, useCallback } from 'react';
import { ExtendedLayout, UseFieldSelectionOutput, UseFieldSelectionProps } from './types';

const SELECTION_ACTIONS_ENABLED_DEFAULT_STATUS: Record<string, boolean> = {
  canSelectAll: false,
  canClearSelect: false,
  canSelectPossible: false,
  canSelectAlternative: false,
  canSelectExcluded: false,
};

export const checkStateCountByKey = <T>(keys: (keyof T)[], obj: T): boolean => {
  return keys.some((key) => (obj[key] as number) > 0);
};

const useFieldSelection = ({ column, app }: UseFieldSelectionProps): UseFieldSelectionOutput => {
  const [fieldInstance, setFieldInstance] = useState<EngineAPI.IField | null>(null);
  const [selectionActionsEnabledStatus, setSelectionActionsEnabledStatus] = useState(
    SELECTION_ACTIONS_ENABLED_DEFAULT_STATUS
  );

  useEffect(() => {
    if (!app || !app.getField || !column || !column.isDim) return;
    app.getField(column.fieldId).then(setFieldInstance);
  }, [app, column]);

  const resetSelectionActionsEnabledStatus = useCallback(
    () => setSelectionActionsEnabledStatus(SELECTION_ACTIONS_ENABLED_DEFAULT_STATUS),
    []
  );
  const updateSelectionActionsEnabledStatus = (layout: ExtendedLayout) => {
    const dimInfo = layout.qHyperCube.qDimensionInfo.find((dim) => dim.qFallbackTitle === column.label);
    if (!dimInfo) return;
    setSelectionActionsEnabledStatus({
      canSelectAll: checkStateCountByKey(['qOption', 'qAlternative', 'qExcluded', 'qDeselected'], dimInfo.qStateCounts),
      canClearSelect: checkStateCountByKey(['qSelected'], dimInfo.qStateCounts),
      canSelectPossible: checkStateCountByKey(['qOption'], dimInfo.qStateCounts),
      canSelectAlternative: checkStateCountByKey(['qAlternative'], dimInfo.qStateCounts),
      canSelectExcluded: checkStateCountByKey(['qAlternative', 'qExcluded'], dimInfo.qStateCounts),
    });
  };

  return {
    fieldInstance,
    selectionActionsEnabledStatus,
    resetSelectionActionsEnabledStatus,
    updateSelectionActionsEnabledStatus,
  };
};

export default useFieldSelection;

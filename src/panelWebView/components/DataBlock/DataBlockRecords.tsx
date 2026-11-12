import { RectangleStackIcon } from '@heroicons/react/24/outline';
import * as React from 'react';
import { DataBlockRecord } from '.';
import { SortableContainer, SortEnd } from 'react-sortable-hoc';
import { useCallback } from 'react';
import { FieldGroup } from '../../../models';
import * as l10n from '@vscode/l10n';
import { LocalizationKey } from '../../../localization';
import { VSCodeLabel } from '../VSCode';

export interface IDataBlockRecordsProps {
  fieldGroups?: FieldGroup[];
  defaultGroupId?: string;
  records: unknown[];
  selectedIndex: number | null;
  onAdd: () => void;
  onSort: (obj: SortEnd) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Container = SortableContainer(({ children }: React.PropsWithChildren<unknown>) => {
  return <ul>{children}</ul>;
});

export const DataBlockRecords = ({
  fieldGroups,
  defaultGroupId,
  records,
  selectedIndex,
  onSort,
  onEdit,
  onDelete
}: React.PropsWithChildren<IDataBlockRecordsProps>) => {
  const getLabel = useCallback((record) => {
    const groupId = record.fieldGroup || defaultGroupId;
    if (groupId) {
      if (fieldGroups) {
        const fieldGroup = fieldGroups.find((f) => f.id === groupId);
        if (fieldGroup && fieldGroup.labelField && record[fieldGroup.labelField]) {
          return record[fieldGroup.labelField];
        }
      }

      return groupId;
    }

    return 'Block';
  }, [fieldGroups, defaultGroupId]);

  if (!records || !records.length) {
    return null;
  }

  return (
    <div className="json_data__list">
      <VSCodeLabel>
        <div className={`metadata_field__label`}>
          <div>
            <RectangleStackIcon style={{ width: '16px', height: '16px' }} />
            <span style={{ lineHeight: '16px' }}>
              {l10n.t(LocalizationKey.panelDataBlockDataBlockRecordsLabel)}
            </span>
          </div>
        </div>
      </VSCodeLabel>

      <Container onSortEnd={onSort} useDragHandle>
        {records.map((v: unknown, idx: number) => (
          <DataBlockRecord
            key={idx}
            id={idx}
            index={idx}
            label={getLabel(v)}
            isSelected={idx === selectedIndex}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </Container>
    </div>
  );
};

import React from 'react';
import { CellProps } from 'react-table';
import { LabelPairedCopyLgRegularIcon } from '@deriv/quill-icons';
import './copy-text.cell.scss';

const CopyTextCell = <T extends object>({
  cell,
}: React.PropsWithChildren<CellProps<T, string[]>>) => {
  return (
    <React.Fragment>
      {cell.value ? (
        <div
          className={'copy_text_cell'}
          onClick={() => {
            navigator.clipboard.writeText(cell.value.toString());
          }}
        >
          {cell.value}
          <span className={'copy_text_cell__icon'}>
            <LabelPairedCopyLgRegularIcon />
          </span>
        </div>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

export default CopyTextCell;

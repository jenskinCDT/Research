import React from 'react';
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
function CustomTable({ title, columns, data, onExport }) {
  return (
    <MaterialTable
      style={{ border: '1px solid #ddd' }}
      columns={columns}
      data={data}
      title={title}
      options={{
        columnsButton: true,
        search: true,
        exportButton: true,
        exportMenu: [
          {
            label: 'Export PDF',
            exportFunc: (cols, datas) => ExportPdf(cols, datas, 'myPdfFileName'),
          },
          {
            label: 'Export CSV',
            exportFunc: (cols, datas) => ExportCsv(cols, datas, 'myCsvFileName'),
          },
        ],
        headerStyle: {
          backgroundColor: '#01579b',
          color: '#FFF',
        },
      }}
    />
  );
}

export default CustomTable;

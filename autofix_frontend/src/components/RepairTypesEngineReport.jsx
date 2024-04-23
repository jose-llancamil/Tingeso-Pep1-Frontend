import React, { useState, useEffect } from 'react';
import reportService from '../services/report.service';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'repairType', headerName: 'Repair Type', width: 200 },
  { field: 'engineType', headerName: 'Engine Type', width: 200 },
  { field: 'count', headerName: 'Count', width: 130 },
];

const RepairTypesEngineReport = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    reportService.generateRepairTypesEngineSummary().then((response) => {
      const formattedData = response.data.map((item, index) => ({
        id: index + 1,
        repairType: item.repairType,
        engineType: item.engineType,
        count: item.count,
      }));
      setReportData(formattedData);
    }).catch((error) => {
      console.error('Error fetching repair type motor report:', error);
    });
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h6" gutterBottom component="div" sx={{ mb: 3 }}>
        Repair Type Engine Summary Report
      </Typography>
      <Typography variant="body2" gutterBottom>
        This report shows the count of each repair type categorized by engine type.
      </Typography>
      <DataGrid
        rows={reportData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
  );
};

export default RepairTypesEngineReport;

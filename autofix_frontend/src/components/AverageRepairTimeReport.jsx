import React, { useState, useEffect } from 'react';
import reportService from '../services/report.service';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'brand', headerName: 'Brand', width: 200 },
  { field: 'averageTime', headerName: 'Average Repair Time', width: 200 },
];

const AverageRepairTimeReport = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    reportService.generateAverageRepairTimesReport().then((response) => {
      const formattedData = response.data.map((item) => ({
        id: item.brand,
        brand: item.brand,
        averageTime: item.averageTime,
      }));
      setReportData(formattedData);
    }).catch((error) => {
      console.error('Error fetching average repair time report:', error);
    });
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h6" gutterBottom component="div" sx={{ mb: 3 }}>
        Average Repair Time Report
      </Typography>
      <Typography variant="body2" gutterBottom>
        This report shows the average repair time for each brand.
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

export default AverageRepairTimeReport;

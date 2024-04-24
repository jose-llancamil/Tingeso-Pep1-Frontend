import React, { useState, useEffect } from 'react';
import reportService from '../services/report.service';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'vehicleDetails', headerName: 'Vehicle', width: 200 }, 
  { field: 'totalCost', headerName: 'Total Cost', width: 130 },
  { field: 'repairCount', headerName: 'Number of Repairs', width: 180 },
];

const RepairCostsReport = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    reportService.generateRepairCostReport().then((response) => {
      const formattedData = response.data.map((item) => ({
        id: item.vehicleId,
        vehicleDetails: item.vehicleDetails, 
        totalCost: item.totalCost,
        repairCount: item.numberOfRepairs,
      }));
      setReportData(formattedData);
    }).catch((error) => {
      console.error('Error fetching repair costs report:', error);
    });
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h6" gutterBottom component="div" sx={{ mb: 3 }}>
        Repair Costs Report
      </Typography>
      <Typography variant="body2" gutterBottom>
        This report shows the total repair costs per vehicle along with the count of repairs.
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

export default RepairCostsReport;

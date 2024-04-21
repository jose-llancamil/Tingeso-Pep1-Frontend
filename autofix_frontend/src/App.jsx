import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import VehicleList from './components/VehicleList';
import AddEditVehicle from './components/AddEditVehicle';
//import RepairList from './components/RepairList';
//import RepairForm from './components/RepairForm';
//import ReportVehicle from './components/RepairCostReport'; // R1
//import ReportRepair from './components/RepairTypeSummaryReport'; // R2
//import ReportAnnual from './components/AverageRepairTimeReport'; // R3
//import ReportSummary from './components/RepairTypeMotorReport'; // R4
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar /> 
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/vehicles/create" element={<AddEditVehicle />} />
          <Route path="/vehicles/edit/:id" element={<AddEditVehicle />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
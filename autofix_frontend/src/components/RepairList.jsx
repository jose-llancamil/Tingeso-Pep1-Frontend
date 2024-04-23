import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import vehicleService from "../services/vehicle.service";
import repairService from "../services/repair.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import BuildIcon from "@mui/icons-material/Build";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const RepairList = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  const init = () => {
    vehicleService.getAll() 
      .then(response => {
        console.log("Mostrando listado de todos los vehículos con reparaciones.", response.data);
        setVehicles(response.data);
      })
      .catch(error => {
        console.log("Error al mostrar los vehículos con reparaciones.", error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (repairId) => {
    const confirmDelete = window.confirm("¿Está seguro que desea eliminar esta reparación?");
    if (confirmDelete) {
      repairService.remove(repairId)
        .then(() => {
          console.log("Reparación eliminada.");
          init();  
        })
        .catch(error => {
          console.error("Error al eliminar la reparación", error);
        });
    }
  };

  return (
    <TableContainer component={Paper}>
      <br />
      <Link to="/repairs/create" style={{ textDecoration: "none" }}>
      <div className="card-content">
        <Button variant="contained" color="primary" startIcon={<BuildIcon />}>
          Añadir Reparación
        </Button>
      </div>
      </Link>
      <br /><br />
      <Table sx={{ minWidth: 650 }} aria-label="tabla de reparaciones">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Patente</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Marca</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Modelo</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Fecha de Entrada</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Tipo de Reparación</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Costo</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Estado</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Operaciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle) =>
            vehicle.repairs.map((repair) => (
              <TableRow key={repair.repairId}>
                <TableCell align="left">{vehicle.licensePlateNumber}</TableCell>
                <TableCell align="left">{vehicle.brand}</TableCell>
                <TableCell align="left">{vehicle.model}</TableCell>
                <TableCell align="left">{repair.entryDate}</TableCell>
                <TableCell align="left">{repair.repairType.description}</TableCell>
                <TableCell align="left">{repair.repairCost}</TableCell>
                <TableCell align="left">{repair.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={() => navigate(`/repairs/edit/${repair.repairId}`)}
                    startIcon={<EditIcon />}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(repair.repairId)}
                    startIcon={<DeleteIcon />}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RepairList;

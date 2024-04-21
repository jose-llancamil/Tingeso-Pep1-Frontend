import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import vehicleService from "../services/vehicle.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";

const AddEditVehicle = () => {
  const [licensePlateNumber, setLicensePlateNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [manufactureYear, setManufactureYear] = useState("");
  const [engineType, setEngineType] = useState("");
  const [mileage, setMileage] = useState("");  
  const [seatCount, setSeatCount] = useState(""); 
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      vehicleService.get(id)
        .then(response => {
          const vehicle = response.data;
          setLicensePlateNumber(vehicle.licensePlateNumber);
          setBrand(vehicle.brand);
          setModel(vehicle.model);
          setType(vehicle.type);
          setManufactureYear(vehicle.manufactureYear);
          setEngineType(vehicle.engineType);
          setMileage(vehicle.mileage); 
          setSeatCount(vehicle.seatCount);
        })
        .catch(error => {
          console.log("Error fetching vehicle details.", error);
        });
    }
  }, [id]);

  const saveVehicle = (e) => {
    e.preventDefault();
    const vehicle = {
      licensePlateNumber,
      brand,
      model,
      type,
      manufactureYear,
      engineType,
      mileage,
      seatCount,
      id
    };

    if (id) {
      vehicleService.update(id, vehicle)
        .then(response => {
          console.log("Vehicle has been updated.", response.data);
          navigate("/vehicles");
        })
        .catch(error => {
          console.log("Error updating vehicle.", error);
        });
    } else {
      vehicleService.create(vehicle)
        .then(response => {
          console.log("Vehicle has been added.", response.data);
          navigate("/vehicles");
        })
        .catch(error => {
          console.log("Error adding vehicle.", error);
        });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
      onSubmit={saveVehicle}
    >
      <h3>{id ? "Edit Vehicle" : "Add Vehicle"}</h3>
      <hr />
      <FormControl fullWidth>
        <TextField label="License Plate Number" value={licensePlateNumber} onChange={e => setLicensePlateNumber(e.target.value)} />
      </FormControl>
      <FormControl fullWidth>
        <TextField label="Brand" value={brand} onChange={e => setBrand(e.target.value)} />
      </FormControl>
      <FormControl fullWidth>
        <TextField label="Model" value={model} onChange={e => setModel(e.target.value)} />
      </FormControl>
      <FormControl fullWidth>
        <TextField label="Type" value={type} onChange={e => setType(e.target.value)} />
      </FormControl>
      <FormControl fullWidth>
        <TextField label="Manufacture Year" value={manufactureYear} onChange={e => setManufactureYear(e.target.value)} />
      </FormControl>
      <FormControl fullWidth>
        <TextField label="Engine Type" value={engineType} onChange={e => setEngineType(e.target.value)} />
      </FormControl>
      <FormControl fullWidth>
        <TextField label="Mileage" type="number" value={mileage} onChange={e => setMileage(e.target.value)} />
      </FormControl>
      <FormControl fullWidth>
        <TextField label="Seat Count" type="number" value={seatCount} onChange={e => setSeatCount(e.target.value)} />
      </FormControl>
      <Button variant="contained" color="primary" type="submit" startIcon={<SaveIcon />}>
        Save
      </Button>
      <hr />
    </Box>
  );
};

export default AddEditVehicle;
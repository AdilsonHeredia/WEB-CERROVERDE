import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    DialogContent,
    Dialog,
    Select,
    MenuItem,
    Grid,
    TextField,
    InputLabel,
    FormControl,
    FormHelperText,
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function CrearPacienteForm() {
    const initialPacienteData = {
        nombre: '',
        ApellidoP: '',
        ApellidoM: '',
        Cedula: '',
        fechaNacimiento: '',
        sexo: '',
        Domicilio: '',
        Telefono: '',
        ocupacionF: '',
        EstadoCivil: '',
    };

    const [pacienteData, setPacienteData] = useState(initialPacienteData);

    const handleChangeA = (event) => {
        const { name, value } = event.target;

        // Check if the input contains only numeric characters
        if (!/^\d+$/.test(value)) {
            alert('Ingrese solo números en el campo Cédula.');
            return;
        }

        setPacienteData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPacienteData({
            ...pacienteData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3400/paciente/familias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pacienteData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Paciente creado:', data);
            // Reset the form fields to the initial state after successful registration
            setPacienteData(initialPacienteData);

            setOpenDialog(true);
        } catch (error) {
            console.error('Error al crear el paciente:', error);
        }
    };

    const handleTelefonoChange = (e) => {
        // Validate if the input is a number
        const value = e.target.value;
        if (!(/^\d+$/.test(value) || value === '')) {
            alert('Por favor ingrese solo valores numéricos para Teléfono.');
            return;
        }

        // Proceed with the regular handleChange logic
        handleChange(e);
    };

    const exportToPDF = () => {
        // ... (unchanged code for exporting to PDF)
    };

    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            <h4>Datos del responsable de familia </h4>

            <Grid container spacing={2}>

                {/* Grid for Nombres */}
                <Grid item xs={4} sm={4}>
                    <InputLabel>Nombres</InputLabel>
                    <TextField
                        name="nombre"
                        fullWidth
                        value={pacienteData.nombre}
                        onChange={handleChange}
                    />
                </Grid>

                {/* Grid for Apellido Paterno */}
                <Grid item xs={12} sm={4}>
                    <InputLabel>Apellido Paterno</InputLabel>
                    <TextField
                        name="ApellidoP"
                        fullWidth
                        value={pacienteData.ApellidoP}
                        onChange={handleChange}
                    />
                </Grid>

                {/* Grid for Apellido Materno */}
                <Grid item xs={12} sm={4}>
                    <InputLabel>Apellido Materno</InputLabel>
                    <TextField
                        name="ApellidoM"
                        fullWidth
                        value={pacienteData.ApellidoM}
                        onChange={handleChange}
                    />
                </Grid>

            </Grid>

            <Grid container spacing={2} alignItems="center">

                {/* Grid for Cédula */}
                <Grid item xs={12} sm={3}>
                    <InputLabel htmlFor="cedula">Cédula</InputLabel>
                    <TextField
                        id="Cedula"
                        name="Cedula"
                        fullWidth
                        value={pacienteData.Cedula}
                        onChange={handleChangeA}
                    />
                </Grid>

                {/* Grid for Fecha de Nacimiento */}
                <Grid item xs={12} sm={3}>
                    <InputLabel htmlFor="fechaNacimiento">Fecha de Nacimiento</InputLabel>
                    <TextField
                        id="fechaNacimiento"
                        type="date"
                        name="fechaNacimiento"
                        fullWidth
                        value={pacienteData.fechaNacimiento}
                        onChange={handleChange}
                    />
                </Grid>

                {/* Grid for Sexo */}
                <Grid item xs={12} sm={3}>
                    <InputLabel >Sexo</InputLabel>
                    <FormControl fullWidth>
                        <Select
                            labelId="sexo-label"
                            name="sexo"
                            fullWidth
                            value={pacienteData.sexo}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>Seleccionar</em>
                            </MenuItem>
                            <MenuItem value="M">M</MenuItem>
                            <MenuItem value="F">F</MenuItem>
                        </Select>
                        <FormHelperText>
                            {pacienteData.sexo === '' ? 'Por favor, seleccione el sexo' : ''}
                        </FormHelperText>
                    </FormControl>
                </Grid>

            </Grid>

            <Grid container spacing={2}>

                {/* Grid for Domicilio */}
                <Grid item xs={12} sm={3}>
                    <InputLabel>Domicilio</InputLabel>
                    <TextField
                        name="Domicilio"
                        fullWidth
                        value={pacienteData.Domicilio}
                        onChange={handleChange}
                    />
                </Grid>

                {/* Grid for Teléfono */}
                <Grid item xs={12} sm={3}>
                    <InputLabel>Teléfono</InputLabel>
                    <TextField
                        name="Telefono"
                        fullWidth
                        value={pacienteData.Telefono}
                        onChange={handleTelefonoChange}
                    />
                </Grid>

                {/* Grid for Ocupación */}
                <Grid item xs={12} sm={3}>
                    <InputLabel>Ocupación</InputLabel>
                    <TextField
                        name="ocupacionF"
                        fullWidth
                        value={pacienteData.ocupacionF}
                        onChange={handleChange}
                    />
                </Grid>

                {/* Grid for Estado Civil */}
                <Grid item xs={12} sm={3}>
                    <InputLabel >Estado Civil</InputLabel>
                    <FormControl fullWidth>
                        <Select
                            labelId="estadoCivil-label"
                            name="EstadoCivil"
                            fullWidth
                            value={pacienteData.EstadoCivil}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>Seleccionar</em>
                            </MenuItem>
                            <MenuItem value="Soltero(a)">Soltero(a)</MenuItem>
                            <MenuItem value="Conviviente">Conviviente</MenuItem>
                            <MenuItem value="Casado">Casado</MenuItem>
                            <MenuItem value="Viudo(a)">Viudo(a)</MenuItem>
                            <MenuItem value="Divorciado(a)">Divorciado(a)</MenuItem>
                            <MenuItem value="Separado(a)">Separado(a)</MenuItem>
                        </Select>
                        <FormHelperText>
                            {/* You can add any additional helper text here */}
                        </FormHelperText>
                    </FormControl>
                </Grid>

            </Grid>

            <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                    setOpenDialog(true);
                }}
                style={{ marginBottom: '10px', backgroundColor: '#5499C7', color: 'white', marginRight: '10px' }}
            >
                Registrar
            </Button>

            {/* ... (unchanged code for the "Imprimir" button) */}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogContent>
                    <Typography variant="h6">Registro exitoso</Typography>
                    <Button onClick={handleCloseDialog} color="primary" autoFocus>
                        Cerrar
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );

}

export default CrearPacienteForm;

import React, { useState } from 'react';
import {
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem, FormControlLabel, Checkbox, FormHelperText,
} from '@mui/material';
import Typography from "@material-ui/core/Typography";




const CreatePacienteForm = () => {

    const handleChangeLaboratorio = (testName, value, setPacienteData) => {
        setPacienteData((prevData) => ({
            ...prevData,
            laboratorio: {
                ...prevData.laboratorio,
                [testName]: value,
            },
            examenClinicoEmergencia: {
                ...prevData.examenClinicoEmergencia,
                [testName]: value,
            },
        }));
    };

    const [pacienteData, setPacienteData] = useState({
        nroHistorial: '',
        nroSus: '',
        nombreP: '',
        ApellidoPP: '',
        ApellidoMP: '',
        CiP: '',
        fechaNacimientoP: '',
        sexoP: '',
        idiomaP: '',
        ocupacionP: '',
        direccionP: '',
        estadoCivilP: '',
        escolaridadP: '',
        grupoSanguineoP: '',
        factorRHP: '',
        otroP: '',
        laboratorio: {
            coproparasitologicoSimple: false,
            coproparasitologicoSeriado: false,
            creatininaSerica: false,
            examenGeneralOrina: false,
            glicemia: false,
            haiChagas: false,
            hemoglobinaHematocrito: false,
            hemogramaCompleto: false,
            pruebaRapidaVIH: false,
            rprSifilisVdrl: false,
        },
        resultadoClinico: {
            tipo: '',
            archivo: '',
        },
        examenClinicoEmergencia: {
            realizado: false,
            notificacionEnviada: false,
        },
        nombreMedico: '',
    });


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
            const response = await fetch('http://localhost:3400/paciente/pacientes', {
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

            // Reset form data after successful submission
            setPacienteData({
                nroHistorial: '',
                nroSus: '',
                nombreP: '',
                ApellidoPP: '',
                ApellidoMP: '',
                CiP: '',
                fechaNacimientoP: '',
                sexoP: '',
                idiomaP: '',
                ocupacionP: '',
                direccionP: '',
                estadoCivilP: '',
                escolaridadP: '',
                grupoSanguineoP: '',
                factorRHP: '',
                otroP: '',
                laboratorio: {
                    coproparasitologicoSimple: false,
                    coproparasitologicoSeriado: false,
                    creatininaSerica: false,
                    examenGeneralOrina: false,
                    glicemia: false,
                    haiChagas: false,
                    hemoglobinaHematocrito: false,
                    hemogramaCompleto: false,
                    pruebaRapidaVIH: false,
                    rprSifilisVdrl: false,
                },
                resultadoClinico: {
                    tipo: '',
                    archivo: '',
                },
                examenClinicoEmergencia: {
                    realizado: false,
                    notificacionEnviada: false,
                },
                nombreMedico: '',
            });
        } catch (error) {
            console.error('Error al crear el paciente:', error);
        }
    };

    // ... (Previous code)

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {/* First Row */}
                <Grid item xs={12} sm={4}>
                    <InputLabel>Número de Historial</InputLabel>
                    <TextField
                        name="nroHistorial"
                        fullWidth
                        value={pacienteData.nroHistorial}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InputLabel>Número de SUS</InputLabel>
                    <TextField
                        name="nroSus"
                        fullWidth
                        value={pacienteData.nroSus}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InputLabel>Nombres</InputLabel>
                    <TextField
                        name="nombreP"
                        fullWidth
                        value={pacienteData.nombreP}
                        onChange={handleChange}
                    />
                </Grid>

                {/* Second Row */}
                <Grid item xs={12} sm={4}>
                    <InputLabel>Apellido Paterno </InputLabel>
                    <TextField
                        name="ApellidoPP"
                        fullWidth
                        value={pacienteData.ApellidoPP}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InputLabel>Apellido Materno </InputLabel>
                    <TextField
                        name="ApellidoMP"
                        fullWidth
                        value={pacienteData.ApellidoMP}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InputLabel>Cédula </InputLabel>
                    <TextField
                        name="CiP"
                        fullWidth
                        value={pacienteData.CiP}
                        onChange={handleChange}
                    />
                </Grid>

                {/* Third Row */}
                <Grid item xs={12} sm={4}>
                    <InputLabel>Fecha de Nacimiento </InputLabel>
                    <TextField
                        name="fechaNacimientoP"
                        type="date"
                        fullWidth
                        value={pacienteData.fechaNacimientoP}
                        onChange={handleChange}
                    />
                </Grid>
                {/* Grid for Sexo */}
                <Grid item xs={12} sm={3}>
                    <InputLabel >Sexo</InputLabel>
                    <FormControl fullWidth>
                        <Select
                            labelId="sexo-label"
                            name="sexoP"
                            fullWidth
                            value={pacienteData.sexoP}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>Seleccionar</em>
                            </MenuItem>
                            <MenuItem value="M">M</MenuItem>
                            <MenuItem value="F">F</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InputLabel>Idioma</InputLabel>
                    <TextField
                        name="idiomaP"
                        fullWidth
                        value={pacienteData.idiomaP}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InputLabel>Ocupación</InputLabel>
                    <TextField
                        name="ocupacionP"
                        fullWidth
                        value={pacienteData.ocupacionP}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InputLabel>Dirección </InputLabel>
                    <TextField
                        name="direccionP"
                        fullWidth
                        value={pacienteData.direccionP}
                        onChange={handleChange}
                    />
                </Grid>

                {/* Grid for Estado Civil */}
                <Grid item xs={12} sm={3}>
                    <InputLabel >Estado Civil</InputLabel>
                    <FormControl fullWidth>
                        <Select
                            labelId="estadoCivil-label"
                            name="estadoCivilP"
                            fullWidth
                            value={pacienteData.estadoCivilP}
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
                <Grid item xs={12} sm={4}>
                    <InputLabel>Grupo Sanguíneo </InputLabel>
                    <TextField
                        name="grupoSanguineoP"
                        fullWidth
                        value={pacienteData.grupoSanguineoP}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InputLabel>Factor RH </InputLabel>
                    <TextField
                        name="factorRHP"
                        fullWidth
                        value={pacienteData.factorRHP}
                        onChange={handleChange}
                    />
                </Grid>

                {/* Fifth Row */}
                <Grid item xs={12} sm={4}>
                    <InputLabel>Otro del Paciente</InputLabel>
                    <TextField
                        name="otroP"
                        fullWidth
                        value={pacienteData.otroP}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InputLabel>Nombre del Médico</InputLabel>
                    <TextField
                        name="nombreMedico"
                        fullWidth
                        value={pacienteData.nombreMedico}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6">Laboratorio</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={pacienteData.laboratorio.coproparasitologicoSimple}
                                    onChange={(e) => handleChangeLaboratorio('coproparasitologicoSimple', e.target.checked, setPacienteData)}
                                />

                            }
                            label="Coproparasitologico Simple"
                        />
                        {/* Repeat similar FormControlLabel components for other tests */}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={pacienteData.laboratorio.coproparasitologicoSeriado}
                                    onChange={(e) => handleChangeLaboratorio('coproparasitologicoSeriado', e.target.checked, setPacienteData)}
                                />

                            }
                            label="Coproparasitologico Seriado"
                        />
                        {/* Repeat similar FormControlLabel components for other tests */}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={pacienteData.laboratorio.rprSifilisVdrl}
                                    onChange={(e) => handleChangeLaboratorio('rprSifilisVdrl', e.target.checked, setPacienteData)}
                                />

                            }
                            label="RPR para Sífilis-VDRL"
                        />
                        {/* Repeat similar FormControlLabel components for other tests */}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={pacienteData.laboratorio.examenGeneralOrina}
                                    onChange={(e) => handleChangeLaboratorio('examenGeneralOrina', e.target.checked, setPacienteData)}
                                />

                            }
                            label="Examen General Orina"
                        />
                        {/* Repeat similar FormControlLabel components for other tests */}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={pacienteData.laboratorio.glicemia}
                                    onChange={(e) => handleChangeLaboratorio('glicemia', e.target.checked, setPacienteData)}
                                />

                            }
                            label="Glicemia"
                        />
                        {/* Repeat similar FormControlLabel components for other tests */}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={pacienteData.laboratorio.haiChagas}
                                    onChange={(e) => handleChangeLaboratorio('haiChagas', e.target.checked, setPacienteData)}
                                />

                            }
                            label="HAI Chagas"
                        />
                        {/* Repeat similar FormControlLabel components for other tests */}
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={pacienteData.laboratorio.hemoglobinaHematocrito}
                                    onChange={(e) => handleChangeLaboratorio('hemoglobinaHematocrito', e.target.checked, setPacienteData)}
                                />

                            }
                            label="Hemoglobina y Hematocrito"
                        />
                        {/* Repeat similar FormControlLabel components for other tests */}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={pacienteData.laboratorio.hemogramaCompleto}
                                    onChange={(e) => handleChangeLaboratorio('hemogramaCompleto', e.target.checked, setPacienteData)}
                                />

                            }
                            label="Hemograma Completo"
                        />
                        {/* Repeat similar FormControlLabel components for other tests */}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={pacienteData.laboratorio.pruebaRapidaVIH}
                                    onChange={(e) => handleChangeLaboratorio('pruebaRapidaVIH', e.target.checked, setPacienteData)}
                                />

                            }
                            label="Prueba Rapida VIH"
                        />
                        {/* Repeat similar FormControlLabel components for other tests */}
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6">Notificacion de emergencia</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={pacienteData.examenClinicoEmergencia.realizado}
                                    onChange={(e) => handleChangeLaboratorio('realizado', e.target.checked, setPacienteData)}
                                />

                            }
                            label="Realizado"
                        />
                        {/* Repeat similar FormControlLabel components for other tests */}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={pacienteData.examenClinicoEmergencia.notificacionEnviada}
                                    onChange={(e) => handleChangeLaboratorio('notificacionEnviada', e.target.checked, setPacienteData)}
                                />

                            }
                            label="Enviar Notificacion"
                        />
                        {/* Repeat similar FormControlLabel components for other tests */}
                    </FormControl>
                </Grid>
                {/* Button Row */}
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Registrar Paciente
                    </Button>
                </Grid>
            </Grid>
        </form>

);



};

export default CreatePacienteForm;


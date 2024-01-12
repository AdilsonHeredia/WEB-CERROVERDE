import React, { useState } from 'react';
import {
    Typography,
    Button,
    Grid,
    TextField,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import jsPDF from "jspdf";
import PrintIcon from '@mui/icons-material/Print';


function BuscarPaciente() {
    const [criteria, setCriteria] = useState({
        nroHistorial: '',
        nroSus: '',
        ApellidoPP: '',
        ApellidoMP: '',
        CiP: '',
    });

    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        // Realiza la llamada a la API para buscar pacientes con los criterios actuales
        // Actualiza el estado de 'searchResults' con los datos obtenidos
        // Por ejemplo, puedes usar fetch o axios aquí

        // Ejemplo de uso con fetch (asegúrate de ajustar la URL y el método según tu API)
        const response = await fetch('http://localhost:3400/paciente/pacientes/buscar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(criteria),
        });

        const data = await response.json();
        setSearchResults(data);
    };
    const handlePrint = (paciente) => {
        // Lógica para imprimir los datos específicos del paciente
        const pdf = new jsPDF({
            orientation: 'portrait',  // Puedes cambiar a 'landscape' si lo prefieres
            unit: 'mm',
            format: 'letter',
        });

        // Configuración para centrar y negrita
        const titleConfig = {
            align: 'center',
            fontStyle: 'bold',
            fontSize: 16,
        };

        // Definir dimensiones y radio del rectángulo con esquinas redondeadas
        const rectWidth = 150;
        const rectHeight = 25;
        const cornerRadius = 5;

        // Calcular la posición x para centrar el rectángulo
        const rectX = (pdf.internal.pageSize.getWidth() - rectWidth) / 2;

        // Dibujar el rectángulo con esquinas redondeadas
        pdf.setDrawColor(200, 200, 200); // Color del borde del rectángulo (puedes ajustarlo)
        pdf.roundedRect(rectX, 10, rectWidth, rectHeight, cornerRadius, cornerRadius, 'D');

        // Encabezado centrado y en negrita dentro del rectángulo
        pdf.setFontSize(titleConfig.fontSize);

        pdf.setTextColor(0, 0, 0); // Color del texto (puedes ajustarlo)
        pdf.text('HISTORIAL CLÍNICO DEL PACIENTE', pdf.internal.pageSize.getWidth() / 2, 20, titleConfig);

        // Datos en dos columnas
        const column1X = 20;
        const column2X =  120;

        pdf.setFontSize(12);


        pdf.text(`Nro Historial: ${paciente.nroHistorial}`, column1X, 70);
        pdf.text(`Nombre: ${paciente.nombreP} ${paciente.ApellidoPP} ${paciente.ApellidoMP}`, column1X, 80);
        pdf.text(`Cédula: ${paciente.CiP}`, column1X, 90);
        pdf.text(`Fecha de Nacimiento: ${new Date(paciente.fechaNacimientoP).toLocaleDateString()}`, column1X, 100);
        pdf.text(`Sexo: ${paciente.sexoP}`, column1X, 110);

        pdf.text(`Idioma: ${paciente.idiomaP}`, column2X, 70);
        pdf.text(`Ocupación: ${paciente.ocupacionP}`, column2X, 80);
        pdf.text(`Dirección: ${paciente.direccionP}`, column2X, 90);
        pdf.text(`Estado Civil: ${paciente.estadoCivilP}`, column2X, 100);
        pdf.text(`Escolaridad: ${paciente.escolaridadP}`, column2X, 110);

        pdf.text(`Grupo Sanguíneo: ${paciente.grupoSanguineoP} ${paciente.factorRHP || ''}`, column1X, 120);



        pdf.text(`Observaciones: ${paciente.otroP || ''}`, column1X, 130);


// Generar 5 rectángulos debajo del texto
        const rectHeightX = 2; // Reducir la altura
        const rectWidthX = 180; // Aumentar el ancho
        const rectSpacing = 2;
        const rectCount = 2;

        for (let i = 0; i < rectCount; i++) {
            const rectY = 130 + rectHeightX + rectSpacing + (i * (rectHeight + rectSpacing));
            pdf.rect(column1X, rectY, rectWidthX, rectHeight);
        }
        // Resto del código...
        // ...
// Obtener la fecha y hora actual
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString();

// Agregar la fecha y hora al documento
        pdf.text(`Fecha : ${formattedDate}`, column1X, 10+ rectHeight + 10);
        pdf.text(`Hora : ${formattedTime}`, column1X, 12 + rectHeight + 20);
        const municipio = "CERCADO";
        const centroSalud = "CERRO VERDE";

        pdf.text(`Municipio: ${municipio}`, column1X, 8 ); // Ajusta la posición vertical
        pdf.text(`Centro de Salud: ${centroSalud}`, column1X + 110, 8); // Ajusta la posición horizontal y vertical

        // Guardar el archivo PDF
        pdf.save(`Historial_Clinico_${paciente._id}.pdf`);
    };


    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Filtrar Paciente
            </Typography>

            <Grid container spacing={2}>
                {/* Agrega campos de entrada para cada criterio */}
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Nro Historial"
                        fullWidth
                        value={criteria.nroHistorial}
                        onChange={(e) => setCriteria({ ...criteria, nroHistorial: e.target.value })}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Apellido Paterno"
                        fullWidth
                        value={criteria.ApellidoPP}
                        onChange={(e) => setCriteria({ ...criteria, ApellidoPP: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Apellido Materno"
                        fullWidth
                        value={criteria.ApellidoMP}
                        onChange={(e) => setCriteria({ ...criteria, ApellidoMP: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Cedula"
                        fullWidth
                        value={criteria.CiP}
                        onChange={(e) => setCriteria({ ...criteria, CiP: e.target.value })}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        style={{ marginTop: '16px' }}
                    >
                        Buscar
                    </Button>
                </Grid>
            </Grid>

            {/* Muestra los resultados en una tabla */}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nro Historial</TableCell>
                            <TableCell>Nombres</TableCell>
                            <TableCell>Apellido P.</TableCell>
                            <TableCell>Apellido M.</TableCell>
                            <TableCell>Cedula</TableCell>
                            <TableCell>Direcion</TableCell>
                            <TableCell>Aciones</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResults.map((paciente) => (
                            <TableRow key={paciente._id}>
                                <TableCell>{paciente.nroHistorial}</TableCell>
                                <TableCell>{paciente.nombreP}</TableCell>
                                <TableCell>{paciente.ApellidoPP}</TableCell>
                                <TableCell>{paciente.ApellidoMP}</TableCell>
                                <TableCell>{paciente.CiP}</TableCell>
                                <TableCell>{paciente.direccionP}</TableCell>
                                {/* Agrega más celdas según tus datos */}
                                <TableCell>
                                    {/* Agrega el icono de impresión con la función correspondiente */}
                                    <Button

                                        onClick={() => handlePrint(paciente)}

                                    >
                                        Imprimir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}

export default BuscarPaciente;

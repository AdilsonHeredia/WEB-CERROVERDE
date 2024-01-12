import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, Paper, TableContainer, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PacienteTable = () => {
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        // Update the URL to the correct endpoint
        fetch('http://localhost:3400/paciente/pacientes', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setPacientes(data);
                } else {
                    console.error('Los datos recibidos no son un array:', data);
                }
            })
            .catch((error) => {
                console.error('Error al obtener los datos de pacientes:', error);
            });
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:3400/paciente/pacientes/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setPacientes(data);
                } else {
                    console.error('Invalid response format:', data);
                }
            })
            .catch((error) => {
                console.error('Error during DELETE request:', error);
            });
    };


    const exportToPdf = () => {
        const doc = new jsPDF();

        // Datos en dos columnas
        const column1X = 20;
        const column2X =  120;

        // Obtener la fecha y hora actual
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString();

// Agregar la fecha y hora al documento
        doc.text(`Fecha : ${formattedDate}`,20, 20);
        doc.text(`Hora : ${formattedTime}`, 20, 25);
        const municipio = "CERCADO";
        const centroSalud = "CERRO VERDE";
       doc.text(`Municipio: ${municipio}`, column1X, 8 ); // Ajusta la posición vertical
        doc.text(`Centro de Salud: ${centroSalud}`, column1X + 80, 8);
        doc.text('Pacientes del centro de salud cerro verde', 50, 40);

        const table = document.getElementById('table-to-export');
        const data = [];
        const rows = table.querySelectorAll('tr');
        rows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            const rowData = [];
            cells.forEach((cell) => {
                rowData.push(cell.textContent);
            });
            data.push(rowData);
        });
        // Update headers to match the new data structure
        const headers = [

            'nroHistorial', 'Nombre', 'Apellido P', 'Apellido M', 'Ci',  'otroP'
        ];

        // Update the body data structure to match the new data structure
        const bodyData = pacientes.map((paciente) => [
             paciente.nroHistorial, paciente.nombreP,
            paciente.ApellidoPP, paciente.ApellidoMP, paciente.CiP, paciente.otroP
        ]);

        doc.autoTable({
            head: [headers],
            body: bodyData,
            startY: 45,
        });

        doc.save('ReportePacientes.pdf');
    };

    return (
        <TableContainer component={Paper}>
            <Button
                variant="contained"
                color="primary"
                onClick={exportToPdf}
                style={{ marginBottom: '10px' }}
            >
                Exportar a PDF
            </Button>
            <Table id="table-to-export" size="small">
                <TableHead style={{ backgroundColor: '#f0f0f0' }}>
                    <TableRow>
                        <TableCell>nroHistorial</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>ApellidoPP</TableCell>
                        <TableCell>ApellidoMP</TableCell>
                        <TableCell>CiP</TableCell>
                        <TableCell>Fecha de Nacimiento</TableCell>
                        <TableCell>Sexo</TableCell>
                        <TableCell>Idioma</TableCell>
                        <TableCell>Ocupación</TableCell>
                        <TableCell>Dirección</TableCell>
                        <TableCell>Estado Civil</TableCell>
                        <TableCell>Escolaridad</TableCell>
                        <TableCell>Grupo Sanguíneo</TableCell>
                        <TableCell>Factor RH</TableCell>
                        <TableCell>Otro</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                {Array.isArray(pacientes) && pacientes.map((paciente, index) => (
                    <TableRow key={index}>
                        <TableCell>{paciente.nroHistorial}</TableCell>
                        <TableCell>{paciente.nombreP}</TableCell>
                        <TableCell>{paciente.ApellidoPP}</TableCell>
                        <TableCell>{paciente.ApellidoMP}</TableCell>
                        <TableCell>{paciente.CiP}</TableCell>
                        <TableCell>{paciente.fechaNacimientoP}</TableCell>
                        <TableCell>{paciente.sexoP}</TableCell>
                        <TableCell>{paciente.idiomaP}</TableCell>
                        <TableCell>{paciente.ocupacionP}</TableCell>
                        <TableCell>{paciente.direccionP}</TableCell>
                        <TableCell>{paciente.estadoCivilP}</TableCell>
                        <TableCell>{paciente.escolaridadP}</TableCell>
                        <TableCell>{paciente.grupoSanguineoP}</TableCell>
                        <TableCell>{paciente.factorRHP}</TableCell>
                        <TableCell>{paciente.otroP}</TableCell>
                        <TableCell>
                            <IconButton
                                color="secondary"
                                aria-label="Eliminar"
                                onClick={() => handleDelete(paciente._id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
        </TableContainer>
    );
};

export default PacienteTable;

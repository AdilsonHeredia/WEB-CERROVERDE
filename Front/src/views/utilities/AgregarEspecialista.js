import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, Paper, TableContainer, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [tableLoaded, setTableLoaded] = useState(false);

    useEffect(() => {
        // Obtener el token de autorización desde localStorage
        const token = localStorage.getItem('token');

        // Realizar la solicitud GET a la API con el token de autorización
        fetch('https://nextel-link-tension-orientation.trycloudflare.com/users/listar', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Comprueba si los datos son un array antes de establecerlos en el estado users
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error('Los datos recibidos no son un array:', data);
                }
            })
            .catch((error) => {
                console.error('Error al obtener los datos de usuarios:', error);
            });

        setTableLoaded(true);
    }, []);

    const handleAddUser = (receiverId) => {
        // Obtiene el senderId del localStorage
        const senderId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id : null;

        // Crea un objeto para los datos del usuario a enviar
        const userData = {
            senderId,
            receiverId,
        };

        // Realiza una solicitud POST a la API para añadir el usuario
        fetch('https://falls-branches-occur-trial.trycloudflare.com/api/conversations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (response.status === 200) {
                    // Usuario añadido exitosamente
                    // Puedes tomar medidas adicionales si es necesario
                } else {
                    console.error('Error al añadir el usuario.');
                }
            })
            .catch((error) => {
                console.error('Error en la solicitud POST:', error);
            });
    };

    const handleFollowUser = (userId) => {
        // Obtiene el userId del localStorage
        const currentUserId = localStorage.getItem('Id');
console.log("ID PRICIPIPAL",currentUserId)
        console.log("ID SEGUNDARIOS",userId)

        // Crea un objeto para los datos del usuario a seguir
        const userData = {
            userId: currentUserId,
        };

        // Realiza una solicitud PUT a la API para seguir al usuario
        fetch(`https://falls-branches-occur-trial.trycloudflare.com/api/users/${userId}/follow`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (response.status === 200) {
                    // Usuario seguido exitosamente
                    // Puedes tomar medidas adicionales si es necesario
                } else {
                    console.error('Error al seguir al usuario.');
                }
            })
            .catch((error) => {
                console.error('Error en la solicitud PUT:', error);
            });
    };

    const exportToPdf = () => {
        // Crear un nuevo objeto jsPDF
        const doc = new jsPDF();
        // Agregar título al PDF
        doc.text('Usuarios del sistema de centro de salud cerro verde', 15, 10);

        // Obtener la tabla como un elemento HTML (puedes usar useRef para obtener la referencia)
        const table = document.getElementById('table-to-export');

        // Crear un arreglo para almacenar los datos de la tabla
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

        // Definir el encabezado de la tabla
        const headers = ['Nombre', 'Apellido Paterno', 'Apellido Materno', 'CI', 'Email', 'Teléfono', 'Especialidad'];

        // Usar jsPDF autotable para agregar la tabla al PDF
        doc.autoTable({
            head: [headers],
            body: data,
            startY: 20, // Posición de inicio de la tabla
        });

        // Guardar el PDF con un nombre específico
        doc.save('ReporteUsuarios.pdf');
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
            <Table id="table-to-export">
                <TableHead>
                    <TableRow>
                        <TableCell>Usuario</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Apellido Paterno</TableCell>
                        <TableCell>Apellido Materno</TableCell>
                        <TableCell>CI</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Especialidad</TableCell>

                        <TableCell>Añadir usuario</TableCell>
                    </TableRow>
                </TableHead>
                {Array.isArray(users) &&
                    users.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <PersonIcon />
                            </TableCell>
                            <TableCell>{user.nombre}</TableCell>
                            <TableCell>{user.apellidoP}</TableCell>
                            <TableCell>{user.apellidoM}</TableCell>
                            <TableCell>{user.Ci}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.Telefono}</TableCell>
                            <TableCell>{user.Especilidad}</TableCell>
                            <TableCell>
                                <IconButton
                                    color="primary"
                                    aria-label="Añadir usuario"
                                    onClick={() => handleAddUser(user._id)}
                                >
                                    <AddIcon />
                                </IconButton>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleFollowUser(user._id)}
                                >
                                    Seguir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
            </Table>
        </TableContainer>
    );
};

export default UserTable;

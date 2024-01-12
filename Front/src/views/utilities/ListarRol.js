import React, { useState, useEffect } from 'react';
import {Table, TableHead, TableRow, TableCell, Paper, TableContainer, Button, IconButton} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {

    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
} from '@mui/material';


const RoleTable = () => {
    const [roles, setRoles] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newRoleName, setNewRoleName] = useState('');

    useEffect(() => {
        // Obtener el token de autorización desde localStorage
        const token = localStorage.getItem('token');

        // Realizar la solicitud GET a la API con el token de autorización
        fetch('https://nextel-link-tension-orientation.trycloudflare.com/roles', {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Comprueba si los datos son un array antes de establecerlos en el estado roles
                if (Array.isArray(data)) {
                    setRoles(data);
                } else {
                    console.error('Los datos recibidos no son un array:', data);
                }
            })
            .catch((error) => {
                console.error('Error al obtener los datos de roles:', error);
            });
    }, []);

    const showCreateFormHandler = () => {
        setShowCreateForm(true);
    };

    const closeCreateFormHandler = () => {
        setShowCreateForm(false);
    };
    const handleCreateRole = (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        console.log("dddddddd",name)

        fetch('https://nextel-link-tension-orientation.trycloudflare.com/roles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Realiza alguna acción con la respuesta de la API si es necesario
            })
            .catch((error) => {
                console.error('Error al crear el rol:', error);
            });
        setShowCreateForm(false);
    };

    const exportToPdf = () => {
        const doc = new jsPDF();
        doc.text('Roles del sistema centro de salud cerro verde', 40, 10);

        // Obtén la tabla como un elemento HTML
        const table = document.getElementById('table-to-export');

        // Crea un arreglo para almacenar los datos de la columna "role.name"
        const data = [];
        const rows = table.querySelectorAll('tr');
        rows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            if (cells.length === 2) { // Asumiendo que la columna "role.name" está en la segunda celda
                data.push([cells[0].textContent]);
            }
        });

        // Utiliza la extensión autotable para generar la tabla en el PDF
        doc.autoTable({
            head: [['Nombre del Rol']],
            body: data
        });

        // Guarda el PDF
        doc.save('role_table.pdf');
    };

    const handleDeleteRole = (roleId) => {
        // Realiza una solicitud DELETE a la API para eliminar el rol con la ID roleId
        const token = localStorage.getItem('token');
        fetch(`https://nextel-link-tension-orientation.trycloudflare.com/roles/${roleId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${token}`, // Añade la autorización si es necesario
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    // Eliminación exitosa, realiza alguna acción si es necesario
                    // Por ejemplo, puedes actualizar la lista de roles después de eliminar uno.
                } else {
                    // Manejar errores o mostrar un mensaje de error
                }
            })
            .catch((error) => {
                console.error('Error al eliminar el rol:', error);
            });
    };




    return (
        <div>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={exportToPdf}
                    style={{ marginBottom: '10px', backgroundColor: '#808080', color: 'white' , marginRight: '10px'}}

                >
                    Exportar a PDF
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={showCreateFormHandler}
                    style={{ marginBottom: '10px', backgroundColor: '#1976D2', color: 'white' }}
                >
                    Crear Nuevo Rol
                </Button>


            </div>
            <Dialog open={showCreateForm} onClose={closeCreateFormHandler}>
                <DialogTitle>Agregar un nuevo Rol</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nombre del Rol"
                        variant="outlined"
                        fullWidth
                        id="name" // Agrega un id al campo de entrada
                        value={newRoleName}
                        onChange={(e) => setNewRoleName(e.target.value)}
                    />

                    <Button onClick={handleCreateRole} variant="contained" color="primary">
                       Agregar
                    </Button>
                </DialogContent>
            </Dialog>
            <TableContainer component={Paper}>
                <Table id="table-to-export">
                    <TableHead>
                        <TableRow>
                            <TableCell >
                                ROLES
                            </TableCell>
                            <TableCell >
                                ACCIONES
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {Array.isArray(roles) && roles.map((role, index) => (
                        <TableRow key={role._id}>
                            <TableCell>{role.name}</TableCell>
                            <TableCell>
                                <IconButton   color="secondary"
                                >
                                    <EditIcon/>
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    onClick={() => handleDeleteRole(role._id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </TableContainer>
        </div>
    );

};

export default RoleTable;

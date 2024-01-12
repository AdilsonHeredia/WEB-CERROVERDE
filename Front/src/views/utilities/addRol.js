import React, { useState, useEffect } from 'react';

import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const RoleTable = () => {
    const [roles, setRoles] = useState([]);

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

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre del Rol</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(roles) && roles.map((role, index) => (
                        <TableRow key={role._id}>
                            <TableCell>{role.name}</TableCell>
                            <TableCell>
                                <IconButton >
                                    <EditIcon />
                                </IconButton>
                                <IconButton >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RoleTable;

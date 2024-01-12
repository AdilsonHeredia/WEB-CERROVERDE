import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, DialogContent, Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para obtener los usuarios desde la API
    const fetchUsers = async () => {
        const token = localStorage.getItem('Authorization');
        try {
            const response = await fetch('http://localhost:8080/users/', {
                headers: {
                    Authorization: token,
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } else {
                console.error('Error al obtener usuarios.');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []); // Realiza la solicitud al cargar el componente

    return (
        <div>
            {loading ? (
                <p>Cargando usuarios...</p>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Apellido Paterno</TableCell>
                                <TableCell>Apellido Materno</TableCell>
                                <TableCell>CI</TableCell>
                                <TableCell>Especialidad</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Nombre de Usuario</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.nombre}</TableCell>
                                    <TableCell>{user.apellidoP}</TableCell>
                                    <TableCell>{user.apellidoM}</TableCell>
                                    <TableCell>{user.Ci}</TableCell>
                                    <TableCell>{user.Especialidad}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.Telefono}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default UserList;

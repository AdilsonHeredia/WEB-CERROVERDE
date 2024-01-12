import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    DialogContent,
    Dialog,
    Select,
    MenuItem,
} from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

const AuthRegister = ({ title, subtitle, subtext }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidoP: '',
        apellidoM: '',
        Ci: '',
        Especialidad: '',
        email: '',
        Telefono: '',
        username: '',
        password: '',
        role: '', // Remove the default role
    });
    const [roles, setRoles] = useState([]); // State to store the roles
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    // Fetch the roles when the component mounts
    useEffect(() => {
        // Make a GET request to fetch the roles
        const token = localStorage.getItem('token');
        fetch('http://localhost:3400/roles', {
            method: 'GET',
            headers: {
                'Authorization': `${token}`, // Añade la autorización si es necesario
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setRoles(data); // Set the roles in the state
            })
            .catch((error) => {
                console.error('Error fetching roles:', error);
            });
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignUp = () => {
        // Send the POST request with the form data
        fetch('http://localhost:3400/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.status === 201) {
                    setRegistrationSuccess(true);
                    window.location.href = '/dashboard';
                } else {
                    console.error('Error in registration.');
                }
            })
            .catch((error) => {
                console.error('Request error:', error);
            });
    };

    const closeSuccessModal = () => {
        setRegistrationSuccess(false);
    };

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Box>
                <Stack mb={3}>

                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="nombre"
                        mb="5px"
                    >
                        Nombre
                    </Typography>
                    <CustomTextField
                        id="nombre"
                        name="nombre"
                        variant="outlined"
                        fullWidth
                        value={formData.nombre}
                        onChange={handleFormChange}
                    />

                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="apellidoP"
                        mb="5px"
                    >
                        Apellido Paterno
                    </Typography>
                    <CustomTextField
                        id="apellidoP"
                        name="apellidoP"
                        variant="outlined"
                        fullWidth
                        value={formData.apellidoP}
                        onChange={handleFormChange}
                    />

                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="apellidoM"
                        mb="5px"
                    >
                        Apellido Materno
                    </Typography>
                    <CustomTextField
                        id="apellidoM"
                        name="apellidoM"
                        variant="outlined"
                        fullWidth
                        value={formData.apellidoM}
                        onChange={handleFormChange}
                    />

                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="Ci"
                        mb="5px"
                    >
                        CI
                    </Typography>
                    <CustomTextField
                        id="Ci"
                        name="Ci"
                        variant="outlined"
                        fullWidth
                        value={formData.Ci}
                        onChange={handleFormChange}
                    />

                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="Especialidad"
                        mb="5px"
                    >
                        Especialidad
                    </Typography>
                    <CustomTextField
                        id="Especialidad"
                        name="Especialidad"
                        variant="outlined"
                        fullWidth
                        value={formData.Especialidad}
                        onChange={handleFormChange}
                    />

                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="email"
                        mb="5px"
                        mt="25px"
                    >
                        Email Address
                    </Typography>
                    <CustomTextField
                        id="email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        value={formData.email}
                        onChange={handleFormChange}
                    />

                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="Telefono"
                        mb="5px"
                        mt="25px"
                    >
                        Teléfono
                    </Typography>
                    <CustomTextField
                        id="Telefono"
                        name="Telefono"
                        variant="outlined"
                        fullWidth
                        value={formData.Telefono}
                        onChange={handleFormChange}
                    />

                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="username"
                        mb="5px"
                        mt="25px"
                    >
                        Nombre de usuario
                    </Typography>
                    <CustomTextField
                        id="username"
                        name="username"
                        variant="outlined"
                        fullWidth
                        value={formData.username}
                        onChange={handleFormChange}
                    />

                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="password"
                        mb="5px"
                        mt="25px"
                    >
                        Password
                    </Typography>
                    <CustomTextField
                        id="password"
                        name="password"
                        variant="outlined"
                        fullWidth
                        value={formData.password}
                        onChange={handleFormChange}
                    />
                    {/* ... Other input fields ... */}
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="role"
                        mb="5px"
                        mt="25px"
                    >
                        Rol
                    </Typography>
                    <Select
                        id="role"
                        name="role"
                        variant="outlined"
                        fullWidth
                        value={formData.role}
                        onChange={handleFormChange}
                    >
                        <MenuItem value="">Seleccionar un rol</MenuItem>
                        {roles.map((role) => (
                            <MenuItem key={role._id} value={role._id}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSignUp}
                >
                    Registrar
                </Button>
            </Box>
            {subtitle}
            <Dialog open={registrationSuccess} onClose={closeSuccessModal}>
                <DialogContent>
                    <p>Registro realizado con éxito</p>
                    <Button onClick={closeSuccessModal}>Cerrar</Button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AuthRegister;

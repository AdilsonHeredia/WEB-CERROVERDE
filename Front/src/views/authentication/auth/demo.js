import React, { useState } from 'react';
import {Box, Typography, Button, DialogContent, Dialog} from '@mui/material';
import { Link } from 'react-router-dom';
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
        role: '652442aaf66d2b32da236b7f',
    });
    const [registrationSuccess, setRegistrationSuccess] = useState(false);


    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignUp = () => {
        // Realiza la solicitud POST a la API REST con los datos del formulario
        fetch('http://localhost:3400/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.status === 201) {

                    console.log('EXITO.');
                    setRegistrationSuccess(true);
                    window.location.href = '/dashboard';
                    // Manejar la respuesta exitosa, por ejemplo, redirigir al usuario a la página de inicio de sesión.
                    // window.location.href = '/auth/login';
                } else {
                    // Manejar errores
                    console.error('Error en el registro.');
                }
            })
            .catch((error) => {
                console.error('Error en la solicitud:', error);
            });
    };
    const closeSuccessModal = () => {
        // Cierra la ventana emergente de éxito
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
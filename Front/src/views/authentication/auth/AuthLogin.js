import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox
} from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const apiUrl = process.env.API_URL;
            const response = await fetch('http://localhost:3400/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Procesar la respuesta exitosa aquí
                console.log('Inicio de sesión exitoso');
                // Procesar la respuesta exitosa aquí
                const data = await response.json();

                // Almacenar el token en localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('Id', data._id);
                localStorage.setItem('Rol', data.role);

                // Redirigir a la URL de Dashboard
                window.location.href = '/dashboard';

            } else {
                // Manejar errores, como credenciales incorrectas
                console.error('Error en el inicio de sesión');
                setError('Credenciales incorrectos. Intente de nuevo');
            }
        } catch (error) {
            console.error('Error en la solicitud: ', error);
        }
    };

    return (
        <>

            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            {error && (
                <Typography variant="body2" color="error">
                    {error}
                </Typography>
            )}

            <Stack>
                <Box>
                    <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='username' mb="5px">Usuario</Typography>
                    <CustomTextField id="username" variant="outlined" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
                </Box>
                <Box mt="25px">
                    <Typography variant="subtitle1"
                                fontWeight={600} component="label" htmlFor='password' mb="5px" >Contraseña</Typography>
                    <CustomTextField id="password" type="password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                </Box>
                <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="recordar este dispositivo"
                        />
                    </FormGroup>
                    <Typography
                        component={Link}
                        to="/"
                        fontWeight="500"
                        sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                        }}
                    >
                        Has olvidado tu contraseña ?
                    </Typography>
                </Stack>
            </Stack>

            <Box>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleLogin}
                >
                    Iniciar sesión
                </Button>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthLogin;

import React from 'react';
import { Button, Container, CssBaseline, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {


        backgroundImage: 'url("https://i.postimg.cc/Mpt6zXXG/logo.png")',

    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(2),
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 'auto',
        transition: 'transform 0.5s ease-in-out',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    content: {
        textAlign: 'center',
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const Login = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/auth/login');
    };

    return (
        <Container component="main" maxWidth="xs" className={classes.root}>
            <CssBaseline />
            <div className={classes.imageContainer}>
                <img
                    src="https://rues.minsalud.gob.bo/img/Logo_MS.jpg"
                    alt="Imagen con animación"
                    className={classes.image}
                />
            </div>
            <div>
                <img
                    src="https://lanuevaserenidad.com/wp-content/uploads/2023/04/Imagen-Popup-Sanitarios.png"
                    alt="Segunda imagen"
                    className={classes.image}
                />
            </div>
            <div className={classes.content}>
                <Typography variant="h5" component="div">
                    ¡Bienvenido!
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Por favor, inicia sesión para continuar.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleLoginClick}
                >
                    Iniciar Sesión
                </Button>
            </div>
        </Container>
    );
};

export default Login;

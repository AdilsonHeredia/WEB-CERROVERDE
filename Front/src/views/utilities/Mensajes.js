import "./messenger.css";
import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from '@material-ui/icons/Info';
import io from 'socket.io-client';
import FilterIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import Slide from '@material-ui/core/Slide';
import LaboratoryIcon from '@material-ui/icons/LocalHospital';
import { PickerDropPane } from 'filestack-react';
import fileDownload from 'js-file-download';
import UpdateIcon from '@material-ui/icons/Update';
import NoteIcon from '@material-ui/icons/Note';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import NotificationsIcon from '@mui/icons-material/Notifications';

import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {
    Button, DialogActions, DialogContent, DialogTitle,
    Grid, ListItemIcon,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import FilestackUploader from "./SolicitudExamen";
import {useTheme} from "@mui/styles";

export default function ChatOnline({ message }) {



    const [friends, setFriends] = useState([]);
    const [notifications, setNotifications] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [conversationId, setConversationId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const theme = useTheme();
    const [socket, setSocket] = useState(null);


    const currentUserId = localStorage.getItem("Id");

    const apiKey = 'AfKpmECkuQTqBURRmvGrlz'; // Reemplaza con tu clave de API de Filestack


    useEffect(() => {
        const newSocket = io('http://localhost:8800'); // Reemplaza con la URL de tu servidor
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        // Escuchar eventos de mensajes en tiempo real
        socket.on('newMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);

            // Actualizar las notificaciones si el mensaje no es del usuario seleccionado
            if (selectedUser && message.sender !== selectedUser.id) {
                setNotifications((prevNotifications) => ({
                    ...prevNotifications,
                    [message.sender]: (prevNotifications[message.sender] || 0) + 1,
                }));
            }
        });

        return () => {
            socket.off('newMessage');
        };
    }, [socket, selectedUser]);

    useEffect(() => {

        const getFriends = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8800/api/users/friends/${currentUserId}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setFriends(data);
                } else {
                    console.log("Error fetching friends");
                }
            } catch (error) {
                console.error("Error fetching friends: ", error);
            }
        };

        getFriends();
    }, [currentUserId]);

    useEffect(() => {
        if (conversationId) {
            const getMessages = async () => {
                try {
                    const response = await fetch(
                        `http://localhost:8800/api/messages/${conversationId}`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setMessages(data);
                    } else {
                        console.log("Error fetching messages");
                    }
                } catch (error) {
                    console.error("Error fetching messages: ", error);
                }
            };

            getMessages();
        }
    }, [conversationId]);




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
    const [patientId, setPatientId] = useState('');

    const handleAgregarClick = (id) => {
        setPatientId(id);
        // Perform any other actions you need with the patientId
    };


    const handleSendMessage = async () => {

        const file = 'Archivospaciente';
        if (conversationId && (messageText || file)) {
            const formData = new FormData();
            formData.append("conversationId", conversationId);
            formData.append("sender", currentUserId);
            formData.append("text", messageText);
            formData.append("patientId",patientId);
            formData.append("file", file);


            try {
                const response = await fetch(`http://localhost:8800/api/messages/`, {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    // Mensaje con archivo enviado con éxito
                } else {
                    console.log("Error sending the message");
                }
            } catch (error) {
                console.error("Error sending the message: ", error);
            }

            setMessageText("");

        }
    }

    const useStyles = makeStyles((theme) => ({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }));

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [patientData, setPatientData] = useState(null);

    const handleClickOpen = (patientId) => {
        setOpen(true);
        // Call fetchData with the provided patientId
        fetchData(patientId);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchData = async (patientId) => {
        try {
            const response = await fetch(`http://localhost:3400/paciente/pacientes/${patientId}`);
            const data = await response.json();
            setPatientData(data);
        } catch (error) {
            console.error('Error fetching patient data:', error);
        }
    };

    useEffect(() => {
        // No need to call fetchData here; it is now handled in handleClickOpen
    }, [open, message]);

    const handleUpdateFile = async () => {
        const updatedFile = 'NuevoArchivoPaciente'; // Replace with the new file data
        const messageIdToUpdate = 'messageId'; // Replace with the actual message ID to update

        const formData = new FormData();
        formData.append("file", updatedFile);

        try {
            const response = await fetch(`http://localhost:8800/api/messages/${messageIdToUpdate}`, {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                // File updated successfully
                console.log("File updated successfully");
            } else {
                console.log("Error updating the file");
            }
        } catch (error) {
            console.error("Error updating the file: ", error);
        }
    };
    const laboratorioUrl = localStorage.getItem('Laboratorio');

    const [updatedResultadoClinico, setUpdatedResultadoClinico] = useState({
        tipo: "pdf",
        archivo: laboratorioUrl  // Initialize with an empty string

    });
    const handleDownloadFile = () => {
        const fileUrl = patientData.resultadoClinico.archivo;

        if (fileUrl) {
            // Trigger the file download
            fetch(fileUrl)
                .then((response) => {
                    const contentType = response.headers.get('Content-Type');
                    const contentDisposition = response.headers.get('Content-Disposition');
                    let fileName = 'downloaded_file';

                    // Check if the Content-Disposition header is available and contains a filename
                    if (contentDisposition) {
                        const match = contentDisposition.match(/filename="?([^"]+)"?/);
                        if (match) {
                            fileName = match[1];
                        }
                    }

                    return response.blob().then((blob) => {
                        fileDownload(blob, fileName, contentType);
                    });
                })
                .catch((error) => console.error('Error downloading file:', error));
        } else {
            console.warn('File URL is empty or undefined.');
        }
    };

    const handleUploadSuccess = (result) => {
        console.log('FilesUploaded:', result.filesUploaded);

        // Mostrar la URL de cada archivo en la consola
        result.filesUploaded.forEach((file) => {
            console.log('URL del archivo:', file.url);
            localStorage.setItem('Laboratorio', file.url);

        });
    };

    const handleUpdateResultadoClinico = async () => {
        try {
            // Check if archivo has data before making the update

                // Make a PUT request to update the patient's resultadoClinico
                const response = await fetch(`http://localhost:3400/paciente/pacientes/${patientData._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ resultadoClinico: updatedResultadoClinico }),
                });

                if (response.ok) {
                    // Handle success (e.g., show a success message)
                    console.log('Resultado Clínico updated successfully');
                } else {
                    // Handle errors
                    console.error('Failed to update Resultado Clínico');
                }

        } catch (error) {
            console.error('Error updating Resultado Clínico', error);
        }
    };

    const handleClick = async (friend) => {
        try {
            const response = await fetch(
                `http://localhost:8800/api/conversations/find/${currentUserId}/${friend._id}`
            );
            if (response.ok) {
                const data = await response.json();
                if (data._id) {
                    setConversationId(data._id);
                }
            } else {
                console.log("Error fetching conversation data");
            }
        } catch (error) {
            console.error("Error fetching conversation data: ", error);
        }
        setSelectedUser(friend);
        setNotifications((prevNotifications) => ({
            ...prevNotifications,
            [friend.id]: 0, // Resetea las notificaciones al hacer clic en un amigo
        }));
    };
    const handleNewMessage = (friendId) => {
        setNotifications((prevNotifications) => ({
            ...prevNotifications,
            [friendId]: (prevNotifications[friendId] || 0) + 1,
        }));
    };



    const estiloCirculo = {
        width: '30px',
        height: '30px',
        backgroundColor: theme.palette.primary.main,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const estiloTexto = {
        fontSize: '11px',
        color: theme.palette.primary.contrastText,
    };

    const estiloIcono = {
        fontSize: '18px',
        color: theme.palette.primary.contrastText,
    };

    return (
        <di>
            <Typography variant="h4" gutterBottom>
                <FilterIcon style={{ fontSize: '1.2em', marginRight: '8px' }} />
                Filtrar Paciente
            </Typography>

            <Grid container spacing={2}>
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
                        label="Nro SUS"
                        fullWidth
                        value={criteria.nroSus}
                        onChange={(e) => setCriteria({ ...criteria, nroSus: e.target.value })}
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
                        startIcon={<SearchIcon />}
                    >
                        Buscar
                    </Button>
                </Grid>
            </Grid>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Nro Historial</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Nombres</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Cedula</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Acciones</TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {searchResults.map((paciente) => (
                            <TableRow key={paciente._id}>
                                <TableCell>{paciente.nroHistorial }</TableCell>
                                <TableCell>{paciente.nombreP } {paciente.ApellidoPP} {paciente.ApellidoMP}</TableCell>


                                <TableCell>{paciente.CiP}</TableCell>

                                {/* Agrega más celdas según tus datos */}
                                <TableCell>

                                    <Button onClick={() => handleAgregarClick(paciente._id)} startIcon={<AddIcon />}>
                                        Agregar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        <div className="messenger">




            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <div>



                        <h3>Medicos:</h3>
                        <ul>
                            {friends.map((friend) => (
                                <li key={friend.id}>
                                    <div className="friend-item">
                                        <div style={estiloCirculo}>
                                            <NotificationsIcon style={estiloIcono} />
                                            <span style={estiloTexto}>3</span>
                                        </div>
                                        <div>

                                            <IconButton
                                                color="primary"
                                                onClick={() => handleClick(friend)}
                                                style={{ marginRight: "8px" }}
                                            >
                                                <PersonIcon />

                                            </IconButton>
                                        </div>
                                        <div>
                                            Dr. {friend.nombre} {friend.apellidoP}

                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            </div>


            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {selectedUser ? (
                        <>
                            <div className="chatBoxTop">
                                <ul>
                                    {messages.map((message) => (
                                        <li
                                            key={message._id}
                                            className={
                                                message.sender === currentUserId
                                                    ? "sent-message"
                                                    : "received-message"
                                            }
                                        >
                                            <div>{message.text}</div>
                                            {message.file && (
                                                <div>

                                                </div>
                                            )}
                                            {message.patientId && (
                                                <div>
                                                    <Button
                                                        variant="outlined"
                                                        style={{ color: "black", borderColor: "black" }}
                                                        onClick={() => message && handleClickOpen(message.patientId)}
                                                        startIcon={<InfoIcon />}
                                                    >
                                                        Ver Detalle
                                                    </Button>

                                                    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                                                        <AppBar>
                                                            <Toolbar>
                                                                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                                                    <CloseIcon />
                                                                </IconButton>
                                                                <Typography variant="h6">
                                                                    Detalles de paciente
                                                                </Typography>
                                                                <Button autoFocus color="inherit" onClick={handleClose}>
                                                                    cerrar
                                                                </Button>
                                                            </Toolbar>
                                                        </AppBar>

                                                        <DialogTitle>Informacion del paciente</DialogTitle>

                                                        <DialogContent>
                                                            {patientData && (
                                                                <List>
                                                                    <ListItem key="name">
                                                                        <ListItemText
                                                                            primary={
                                                                                <Typography>
                                                                                    <strong>NOMBRES:</strong> {patientData.nombreP} {patientData.ApellidoPP} {patientData.ApellidoMP}
                                                                                </Typography>
                                                                            }
                                                                        />
                                                                    </ListItem>
                                                                    <Divider key="divider" />
                                                                    <ListItem key="nroHistorial">
                                                                        <ListItemText
                                                                            primary={
                                                                                <Typography>
                                                                                    <strong>Nro HISTORIAL:</strong> {patientData.nroHistorial}  <strong>Nro SUS:</strong> {patientData.nroSus}
                                                                                </Typography>
                                                                            }
                                                                        />

                                                                    </ListItem>
                                                                    <Divider key="fechaNacimientoP-divider" />
                                                                    <ListItem key="fechaNacimientoP">
                                                                        <ListItemText
                                                                            primary={
                                                                                <Typography>
                                                                                    <strong>FECHA DE NACIMIENTO:</strong> {new Date(patientData.fechaNacimientoP).toLocaleDateString()}
                                                                                </Typography>
                                                                            }
                                                                        />

                                                                    </ListItem>
                                                                    <Divider key="CiP-divider" />
                                                                    <ListItem key="CiP">
                                                                        <ListItemText
                                                                            primary={
                                                                                <Typography>
                                                                                    <strong>CEDULA:</strong> {patientData.CiP} <strong>SEXO:</strong> {patientData.sexoP} <strong>IDIOMA:</strong> {patientData.idiomaP}
                                                                                </Typography>
                                                                            }
                                                                        />

                                                                    </ListItem>
                                                                    <Divider key="ocupacionP-divider" />
                                                                    <ListItem key="ocupacionP">
                                                                        <ListItemText
                                                                            primary={
                                                                                <Typography>
                                                                                    <strong>OCUPACION:</strong> {patientData.ocupacionP} <strong>DIRECCION:</strong> {patientData.direccionP} <strong>ESTADO CIVIL:</strong> {patientData.estadoCivilP}
                                                                                </Typography>
                                                                            }
                                                                        />

                                                                    </ListItem>
                                                                    <Divider key="escolaridadP-divider" />
                                                                    <ListItem key="escolaridadP">
                                                                        <ListItemText
                                                                            primary={
                                                                                <Typography>
                                                                                    <strong>ESCOLARIDAD:</strong> {patientData.escolaridadP} <strong>GRUPO SANGUINEO:</strong> {patientData.grupoSanguineoP} <strong>Factor RH:</strong> {patientData.factorRHP}
                                                                                </Typography>
                                                                            }
                                                                        />

                                                                    </ListItem>
                                                                    <Divider key="nombreMedico-divider" />
                                                                    <ListItem key="nombreMedico">
                                                                        <ListItemText
                                                                            primary={
                                                                                <Typography>
                                                                                    <strong>Nombre del Médico:</strong> {patientData.nombreMedico}
                                                                                </Typography>
                                                                            }
                                                                        />


                                                                    </ListItem>
                                                                    <ListItemText
                                                                        primary={
                                                                            <>
                                                                                     <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
                                                                                                  <LaboratoryIcon style={{ fontSize: 34 }} />
                                                                                                          </span>
                                                                                <span style={{ fontWeight: 'bold' }}>LABORATORIOS A REALIZAR:</span>
                                                                            </>
                                                                        }
                                                                    />
                                                                    {patientData && (
                                                                        <>
                                                                            {patientData.laboratorio && (
                                                                                <>
                                                                                    {patientData.laboratorio.coproparasitologicoSimple && (
                                                                                        <ListItem key="coproparasitologicoSimple">
                                                                                            <ListItemText primary="Coproparasitologico Simple" />
                                                                                        </ListItem>
                                                                                    )}
                                                                                    {patientData.laboratorio.coproparasitologicoSeriado && (
                                                                                        <ListItem key="coproparasitologicoSeriado">
                                                                                            <ListItemText primary="Coproparasitologico Seriado" />
                                                                                        </ListItem>
                                                                                    )}
                                                                                    {patientData.laboratorio.creatininaSerica && (
                                                                                        <ListItem key="creatininaSerica">
                                                                                            <ListItemText primary="Creatinina Serica" />
                                                                                        </ListItem>
                                                                                    )}
                                                                                    {patientData.laboratorio.examenGeneralOrina && (
                                                                                        <ListItem key="examenGeneralOrina">
                                                                                            <ListItemText primary="Examen General Orina" />
                                                                                        </ListItem>
                                                                                    )}
                                                                                    {patientData.laboratorio.glicemia && (
                                                                                        <ListItem key="glicemia">
                                                                                            <ListItemText primary="Glicemia" />
                                                                                        </ListItem>
                                                                                    )}
                                                                                    {patientData.laboratorio.haiChagas && (
                                                                                        <ListItem key="haiChagas">
                                                                                            <ListItemText primary=" Examen de Chagas" />
                                                                                        </ListItem>
                                                                                    )}
                                                                                    {patientData.laboratorio.hemoglobinaHematocrito && (
                                                                                        <ListItem key="hemoglobinaHematocrito">
                                                                                            <ListItemText primary="Hemoglobina Hematocrito" />
                                                                                        </ListItem>
                                                                                    )}
                                                                                    {patientData.laboratorio.hemogramaCompleto && (
                                                                                        <ListItem key="hemogramaCompleto">
                                                                                            <ListItemText primary="Hemograma Completo" />
                                                                                        </ListItem>
                                                                                    )}
                                                                                    {patientData.laboratorio.pruebaRapidaVIH && (
                                                                                        <ListItem key="pruebaRapidaVIH">
                                                                                            <ListItemText primary="Prueba Rapida VIH" />
                                                                                        </ListItem>
                                                                                    )}



                                                                                    {/* Add more conditions for other fields in the "laboratorio" object */}
                                                                                </>
                                                                            )}


                                                                            {patientData.examenClinicoEmergencia && patientData.examenClinicoEmergencia.realizado && (
                                                                                <ListItem key="examenClinicoEmergencia">
                                                                                    <ListItemText primary="Examen Clínico de Emergencia Realizado" />
                                                                                </ListItem>
                                                                            )}
                                                                        </>
                                                                    )}

                                                                    <ListItemText
                                                                        primary={
                                                                            <>
                                                                                <ListItemIcon>
                                                                                    <NoteIcon style={{ fontSize: 34 }} />
                                                                                </ListItemIcon>
                                                                                <span style={{ fontSize: 11 }}>
                                                                                         * Solamente se permite subir un archivo, puede ser de cualquier tamaño y en todos los formatos.*
                                                                                </span>
                                                                            </>

                                                                        }
                                                                    />

                                                                    <Divider key="resultadoClinico-divider" />

                                                                    <ListItem key="resultadoClinico" style={{ border: '2px solid #ccc', padding: '10px', marginBottom: '10px' }}>

                                                                        <Button onClick={handleDownloadFile} color="primary" startIcon={<CloudDownloadIcon style={{ fontSize: 44 }} />}>
                                                                            Descargar Documentos de laboratorio
                                                                        </Button>
                                                                        <PickerDropPane
                                                                            apikey={apiKey}
                                                                            onSuccess={handleUploadSuccess}
                                                                            onError={(error) => console.error(error)}
                                                                            render={({ onPick }) => (
                                                                                <button onClick={onPick} style={{ margin: '5px' }}>Seleccionar Archivos</button>
                                                                            )}
                                                                        />
                                                                        <Button onClick={handleUpdateResultadoClinico} color="primary" startIcon={<UpdateIcon style={{ fontSize: 44 }} />} >
                                                                            Actualizar Resultado Clínico
                                                                        </Button>
                                                                    </ListItem>

                                                                </List>
                                                            )}


                                                        </DialogContent>

                                                    </Dialog>
                                                </div>

                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="chatBoxBottom">
        <textarea
            className="chatMessageInput"
            placeholder={`Escribe el mensaje...`}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
        ></textarea>

                                <button className="chatSubmitButton" onClick={handleSendMessage}>
                                    Enviar
                                </button>

                            </div>
                        </>
                    ) : null}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">{/* Online users */}</div>
            </div>
        </div>

        </di>
    );
}

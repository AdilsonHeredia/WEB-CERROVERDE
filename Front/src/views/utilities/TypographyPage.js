import React, { useState, useEffect } from 'react';
import {Table, TableHead, TableRow, TableCell, Paper, TableContainer, IconButton, Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
        //fetchUsers();
        setTableLoaded(true);
  }, []);

    const handleDeleteUser = (userId) => {
        // Realiza una solicitud DELETE al servidor para eliminar el usuario por su ID
        fetch(`https://nextel-link-tension-orientation.trycloudflare.com/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('Authorization'), // Añade el encabezado de autorización si es necesario
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    // Usuario eliminado exitosamente
                    // Puedes actualizar la lista de usuarios si es necesario
                  // // Esta función debería volver a cargar la lista de usuarios después de la eliminación
                } else {
                    console.error('Error al eliminar el usuario.');
                }
            })
            .catch((error) => {
                console.error('Error en la solicitud:', error);
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
        const headers = ['Nombre', 'Apellido Paterno', 'Apellido Materno', 'CI', 'Email', 'Teléfono', 'Nombre de Usuario'];

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
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido Paterno</TableCell>
              <TableCell>Apellido Materno</TableCell>
              <TableCell>CI</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Nombre de Usuario</TableCell>
                <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          {Array.isArray(users) && users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.nombre}</TableCell>
                <TableCell>{user.apellidoP}</TableCell>
                <TableCell>{user.apellidoM}</TableCell>
                <TableCell>{user.Ci}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.Telefono}</TableCell>
                <TableCell>{user.username}</TableCell>
                  <TableCell>
                      <IconButton
                          color="primary"
                          aria-label="Editar"
                          // Reemplaza handleEditUser con la función adecuada
                      >
                          <EditIcon/>
                      </IconButton>
                      <IconButton
                          color="secondary"
                          aria-label="Eliminar"
                          onClick={() => handleDeleteUser(user._id)}
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

export default UserTable;

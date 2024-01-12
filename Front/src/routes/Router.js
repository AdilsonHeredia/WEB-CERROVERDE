import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import listaRegitro from '../views/authentication/listUsers';

import ListarRoles from '../views/utilities/ListarRol';
import HistorialClinica from '../views/utilities/HistorialClinica';
import ListarPaciente from '../views/utilities/ListarPaciente';
import BuscarPaciente from '../views/utilities/BuscarPaciente';
import SeguirUsuario from '../views/utilities/SeguirUsuario';
import Profile from '../views/utilities/Contactos';
import AgregarEspecialista from '../views/utilities/AgregarEspecialista';
import Mensajes from '../views/utilities/Mensajes';
import PaginaInicial from '../views/utilities/SolicitudExamen';


/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const Icons = Loadable(lazy(() => import('../views/icons/Icons')))
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
//const listaResitro = Loadable(lazy(() => import('../views/authentication/listUsers')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {

    element: <BlankLayout />,
    children: [
      { path: '/inicio', exact: true, element: <PaginaInicial />  },
      { path: '/auth/login', exact: true, element: <Login /> }, // Mover la ruta de Login aquí
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <FullLayout />,
    children: [

      { path: '/', element: <Navigate to="/inicio" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '/listarUsuarios', exact: true, element:  <listaRegitro />  },
      { path: '/listar', exact: true, element: <ListarRoles />  },
      { path: '/historial', exact: true, element: <HistorialClinica  />  },
      { path: '/listarpaciente', exact: true, element: <ListarPaciente />  },
      { path: '/buscarpaciente', exact: true, element: <BuscarPaciente />  },
      { path: '/seguirusuario', exact: true, element: <SeguirUsuario  />  },
      { path: '/agregarespecialiasta', exact: true, element: <AgregarEspecialista  />  },
      { path: '/perfil', exact: true, element: <Profile  />  },
      { path: '/mensajes', exact: true, element: <Mensajes />  },

      { path: '/icons', exact: true, element: <Icons /> },
      { path: '/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];


export default Router;

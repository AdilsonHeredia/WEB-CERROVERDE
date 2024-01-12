import { IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus } from '@tabler/icons';
import { uniqueId } from 'lodash';

// Obtén el rol del localStorage
const rol = localStorage.getItem('Rol');

// Crea una variable para almacenar los elementos del menú basados en el rol
let menuItemsBasedOnRol = [];

if (rol === 'admin') {
  menuItemsBasedOnRol = [
    {
      navlabel: true,
      subheader: 'Gestion de Usuarios',
    },
    {
      id: uniqueId(),
      title: 'Regitrar Usuarios',
      icon: IconUserPlus,
      href: '/auth/register',
    },
    {
      id: uniqueId(),
      title: 'Ver usuarios',
      icon: IconUserPlus,
      href: '/ui/typography',
    },
    {
      id: uniqueId(),
      title: 'Roles',
      icon: IconUserPlus,
      href: '/listar',
    },
  ];
} else if (rol === 'doctor') {
  menuItemsBasedOnRol = [
    {
      navlabel: true,
      subheader: 'Pacientes',
    },
    {
      id: uniqueId(),
      title: 'Historia clinica',
      icon: IconUserPlus,
      href: '/historial',
    },
    {
      id: uniqueId(),
      title: 'Listar Paciente',
      icon: IconUserPlus,
      href: 'listarpaciente',
    },
    {
      id: uniqueId(),
      title: 'Buscar Paciente',
      icon: IconUserPlus,
      href: '/buscarpaciente',
    },
    {
      navlabel: true,
      subheader: 'Laboratorio',
    },
    {
      id: uniqueId(),
      title: 'Agregar usuario',
      icon: IconUserPlus,
      href: '/seguirusuario',
    },
    {
      id: uniqueId(),
      title: 'Agregar especialista',
      icon: IconUserPlus,
      href: '/agregarespecialiasta',
    },
    {
      id: uniqueId(),
      title: 'Solicitud de laboratorio',
      icon: IconUserPlus,
      href: '/examenlaboratorio',
    },
    {
      id: uniqueId(),
      title: 'Solicitudes',
      icon: IconUserPlus,
      href: '/mensajes',
    },

  ];
}

// Combina los elementos del menú comunes con los basados en el rol
const combinedMenuItems = [
  {
    navlabel: true,
    subheader: 'Inicio',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },

  ...menuItemsBasedOnRol, // Agrega los elementos basados en el rol
];

export default combinedMenuItems;




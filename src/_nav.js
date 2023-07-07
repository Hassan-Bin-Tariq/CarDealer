import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Login',
    to: '/login',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Filters',
  },
  {
    component: CNavGroup,
    name: 'Car Condition',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'New car',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Old car',
        to: '/base/breadcrumbs',
      }
    ],
  },

  {
    component: CNavGroup,
    name: 'Brand Name',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'BMW',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Ferrari',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Mercedez',
        to: '/buttons/dropdowns',
      },
      {
        component: CNavItem,
        name: 'Hyundai',
        to: '/buttons/dropdowns',
      },
      {
        component: CNavItem,
        name: 'Nissan',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Car model',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '3-Series',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Carrera',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: 'G-TR',
        to: '/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Macan',
        to: '/forms/range',
      },
      {
        component: CNavItem,
        name: 'N-Series',
        to: '/forms/input-group',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Choose year',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '2023',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: '2022',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: '2021',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Choose milieage',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '5000 Miles',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: '4000 Miles',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: '3000 Miles',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: '2000 Miles',
        to: '/notifications/toasts',
      },
      {
        component: CNavItem,
        name: '1000 Miles',
        to: '/notifications/toasts',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Price Range',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '$1000 - $5000',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: '$5000 - $10000',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: '$15000 - $20000',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: '$20000 - $25000',
        to: '/notifications/toasts',
      },
      {
        component: CNavItem,
        name: '$25000 - $30000',
        to: '/notifications/toasts',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Body Type',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Sedan',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Compact',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Coupe',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Wagon',
        to: '/notifications/toasts',
      },
    ],
  },
]

export default _nav
